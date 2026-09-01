"use client";

import { useState, useEffect, useCallback, useRef, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useSelfOrder } from "@/context/SelfOrderContext";
import { createPortal } from "react-dom";

// ── Redux / Custom hooks ──────────────────────────────────────────────────────
import { useProducts, useProductFilters } from "@/hooks/useProducts";
import { API_BASE_URL } from "@/lib/api";
import type { Product, ProductVariant } from "@/lib/store";

type ProductCardDetails = {
  recipe?: string;
  ingredients?: string[];
  prepTime?: string;
  nutritionalInfo?: string;
};

type ProductWithOptionalDetails = Product & {
  details?: ProductCardDetails;
};

// Helpers
const isUrduText = (text: string) => /[\u0600-\u06FF]/.test(text || "");

const getCategoryName = (category: any): string => {
  if (!category) return "";
  if (typeof category === "string") return category;
  return category.CategoryName || category.name || "";
};

// Aggressively cleans up messy backend names, bottle sizes, stray numbers, and variant keywords
const cleanProductName = (text?: string | null, categoryName?: string | null) => {
  if (!text) return "";
  let cleaned = String(text).replace(/[()]/g, " ");

  // Remove quantity + unit (e.g., 0.5 Liter, 12 pieces)
  cleaned = cleaned.replace(/\b\d+(\.\d+)?\s*(l|ltr|liter|litre|ml|oz|pieces|piece|pcs|عدد|gm|g|kg)\b/gi, " ");

  // Remove standalone numbers (e.g., "24" or "1")
  cleaned = cleaned.replace(/\b\d+\b/g, " ");

  // Remove variant keywords (English and Urdu)
  cleaned = cleaned.replace(/(^|\s)(half|full|medium|low|large|small|regular|ہاف|فل)($|\s)/gi, " ");

  return cleaned.replace(/\s+/g, " ").trim();
};

// Deduplicate variants safely with null safety
const getUniqueVariants = (variants?: ProductVariant[] | null): ProductVariant[] => {
  if (!variants || !Array.isArray(variants)) return [];
  const seen = new Set<string>();
  return variants.filter((v) => {
    if (!v || !v.name) return false;
    const key = `${String(v.name).trim().toLowerCase()}-${v.price || 0}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Image helper
// ─────────────────────────────────────────────────────────────────────────────
function getDishFallbackImage(name?: string | null, categoryName?: string | null): string {
  const n = String(name || "").toLowerCase();
  const c = String(categoryName || "").toLowerCase();

  if (n.includes("samosa") || n.includes("سموسہ")) return "/ssamosa.png";
  if (n.includes("biryani") || n.includes("بریانی")) return "/biryani.png";
  if (n.includes("pulao") || n.includes("پلاؤ") || n.includes("plao")) return "/chickenpulao.webp";
  if (n.includes("nugget") || n.includes("نِگٹس") || n.includes("nugit")) return "/chickennuggets.webp";
  if (n.includes("dahi bhall") || n.includes("دہی بھلے") || n.includes("bhala")) return "/dahibhallay.webp";
  if (n.includes("dal") || n.includes("daal") || n.includes("دال")) return "/dalrice.webp";
  if (n.includes("kabab") || n.includes("kebab") || n.includes("کباب") || n.includes("seekh")) return "/seekhkabab.webp";
  if (n.includes("roll") || n.includes("رول")) return "/springrolls.webp";
  if (n.includes("gol gapp") || n.includes("گول گپے")) return "/golgappy.png";
  if (n.includes("chutni") || n.includes("چٹنی")) return "/chutni.png";
  if (n.includes("bottal") || n.includes("bottle") || c.includes("mashrobat") || c.includes("مشروبات")) return "/drinks_compressed.webp";
  if (n.includes("pan masala") || c.includes("azafi") || c.includes("اضافی")) return "/extra_items_compressed.webp";
  if (c.includes("chat") || c.includes("چاٹ")) return "/chaat_compressed.webp";
  if (c.includes("achar") || c.includes("اچار")) return "/achar_compressed.webp";
  if (c.includes("frozen") || c.includes("فروزن")) return "/frozen_compressed.webp";
  return "/desi_compressed.webp";
}

function productImageUrl(image?: string | null, productName?: string | null, categoryName?: string | null): string {
  if (!image || typeof image !== 'string' || image.trim() === "") {
    return getDishFallbackImage(productName, categoryName);
  }
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("/uploads/") || image.startsWith("uploads/")) {
    return `${API_BASE_URL}/${image.replace(/^\//, "")}`;
  }
  if (image.startsWith("/")) return image;
  if (image.startsWith("images/")) return `/${image}`;
  return `${API_BASE_URL}/${image}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Category display helpers
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_IMAGE_MAP: Record<string, string> = {
  Desi: "/desi_compressed.webp",
  دیسی: "/desi_compressed.webp",
  Mashrobat: "/drinks_compressed.webp",
  مشروبات: "/drinks_compressed.webp",
  "Azafi Ashia": "/extra_items_compressed.webp",
  "اضافی اشیاء": "/extra_items_compressed.webp",
  Chat: "/chaat_compressed.webp",
  چاٹ: "/chaat_compressed.webp",
  Achar: "/achar_compressed.webp",
  اچار: "/achar_compressed.webp",
  Frozen: "/frozen_compressed.webp",
  فروزن: "/frozen_compressed.webp",
};

const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  Desi: "دیسی",
  دیسی: "دیسی",
};

// ─────────────────────────────────────────────────────────────────────────────
// Modals
// ─────────────────────────────────────────────────────────────────────────────
function ProductQuickAddModal({
  isOpen,
  onClose,
  product,
  selectedVariant: _unusedSelectedVariant,
  onSelectVariant: _unusedOnSelectVariant,
  quantity: _unusedQuantity,
  onIncrease: _unusedOnIncrease,
  onDecrease: _unusedOnDecrease,
  onConfirm: _unusedOnConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: ProductWithOptionalDetails;
  selectedVariant?: ProductVariant;
  onSelectVariant: (variant?: ProductVariant) => void;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onConfirm: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const { cart, setVariantQuantities } = useCart();
  const cartItem = cart.find((c) => String(c.item.id) === String(product.id));

  const [variantSelections, setVariantSelections] = useState<{ [variantId: string]: number }>({});
  const [localSelectedVariant, setLocalSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [baseQuantity, setBaseQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const categoryName = getCategoryName(product.category);
  const variants = getUniqueVariants(product.variants);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (variants.length > 0) {
        setVariantSelections(cartItem?.variantQuantities || {});
        setLocalSelectedVariant(undefined); // No option auto-selected by default!
      } else {
        setBaseQuantity(cartItem?.quantity || 1);
      }
    }
  }, [isOpen, cartItem, variants.length]);

  if (!isOpen || !mounted) return null;

  const detailText = product.details?.recipe || product.details?.nutritionalInfo || "Freshly prepared with premium ingredients and bold flavors.";
  const cleanName = cleanProductName(product.name, categoryName);
  const isUrdu = isUrduText(cleanName);

  const currentSelectedVariantQty = localSelectedVariant ? (variantSelections[localSelectedVariant.id] || 0) : 0;

  const handleVariantClick = (variant: ProductVariant) => {
    setLocalSelectedVariant(variant);
    setVariantSelections((prev) => {
      const currentQty = prev[variant.id] || 0;
      return {
        ...prev,
        [variant.id]: currentQty + 1,
      };
    });
  };

  const handleLocalIncrease = () => {
    if (variants.length > 0) {
      if (!localSelectedVariant) return;
      setVariantSelections((prev) => ({
        ...prev,
        [localSelectedVariant.id]: (prev[localSelectedVariant.id] || 0) + 1,
      }));
    } else {
      setBaseQuantity((qty) => qty + 1);
    }
  };

  const handleLocalDecrease = () => {
    if (variants.length > 0) {
      if (!localSelectedVariant) return;
      setVariantSelections((prev) => {
        const current = prev[localSelectedVariant.id] || 0;
        const next = Math.max(0, current - 1);
        const updated = { ...prev };
        if (next === 0) {
          delete updated[localSelectedVariant.id];
        } else {
          updated[localSelectedVariant.id] = next;
        }
        return updated;
      });
    } else {
      setBaseQuantity((qty) => Math.max(1, qty - 1));
    }
  };

  const handleConfirm = () => {
    if (setVariantQuantities) {
      if (variants.length > 0) {
        setVariantQuantities(product.id, variantSelections, toCartItem(product, localSelectedVariant || variants[0]));
      } else {
        setVariantQuantities(product.id, {}, toCartItem(product), baseQuantity);
      }
    }
    onClose();
  };


  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative flex h-[min(92dvh,760px)] w-full max-w-[860px] flex-col overflow-hidden rounded-t-[24px] bg-white shadow-2xl sm:h-[min(520px,92vh)] sm:flex-row sm:rounded-[24px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-44 w-full shrink-0 overflow-hidden bg-[#3d1400] sm:h-auto sm:w-1/2">
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#6b2800]/60 via-[#3d1400]/30 to-[#1a0800]/80" />
          <Image
            src={productImageUrl(product.image, product.name, categoryName)}
            alt={cleanName}
            fill
            className="object-cover opacity-90"
            unoptimized
          />
          <div className="absolute bottom-4 left-4 z-20 sm:bottom-5 sm:left-5">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-white/70 backdrop-blur-sm">
              Zee Food Gallery
            </span>
          </div>
        </div>

        <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-y-auto bg-white no-scrollbar sm:w-1/2">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-brand-dark transition-colors hover:text-brand-primary shadow-sm"
            aria-label="Close"
          >
            <span className="text-xl font-black leading-none">×</span>
          </button>

          <div className="flex flex-col gap-3 p-6 sm:p-8 flex-1">
            {/* Tag */}
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-brand-primary">
              Customize your order
            </p>

            {/* 1. Product Name */}
            <h3
              className={`font-black text-brand-dark leading-tight ${
                isUrdu ? "font-ama-dhaba text-2xl sm:text-3xl" : "text-xl sm:text-2xl uppercase"
              }`}
            >
              {cleanName}
            </h3>

            {/* 2. Price */}
            {variants.length > 0 ? (
              <p className="text-base font-black text-brand-primary -mt-1">
                From Rs.{" "}
                {Math.min(...variants.map((v) => v.price || 0)).toLocaleString()}
              </p>
            ) : product.price > 0 ? (
              <p className="text-base font-black text-brand-primary -mt-1">
                Rs. {product.price.toLocaleString()}
              </p>
            ) : null}

            {/* 3. Description – max 3 lines */}
            <p className="text-xs font-medium leading-relaxed text-brand-dark/65 line-clamp-3">
              {detailText}
            </p>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* 4. Size Selection */}
            {variants.length > 0 && (
              <div>
                <p className="mb-2 text-[9px] font-black uppercase tracking-[0.22em] text-brand-dark/50">
                  Size <span className="text-brand-primary">*</span>
                </p>
                <div className="flex flex-col gap-1.5">
                  {variants.map((variant) => {
                    const isSelected = localSelectedVariant?.id === variant.id;
                    const qty = variantSelections[variant.id] || 0;
                    return (
                      <button
                        key={variant.id || variant.name}
                        type="button"
                        onClick={() => handleVariantClick(variant)}
                        className={`flex items-center justify-between rounded-[12px] border px-4 py-2.5 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-brand-primary bg-brand-primary/8 ring-2 ring-brand-primary/25"
                            : "border-gray-200 bg-[#fbf7f2] hover:border-brand-primary/40"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {/* Radio dot */}
                          <span
                            className={`h-3.5 w-3.5 rounded-full border-2 flex-shrink-0 transition-all ${
                              isSelected
                                ? "border-brand-primary bg-brand-primary"
                                : "border-gray-300 bg-white"
                            }`}
                          />
                          <span
                            className={`text-[11px] font-black uppercase tracking-wider ${
                              isSelected ? "text-brand-primary" : "text-brand-dark"
                            }`}
                          >
                            {variant.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold ${
                              isSelected ? "text-brand-primary" : "text-brand-dark/60"
                            }`}
                          >
                            Rs. {(variant.price || 0).toLocaleString()}
                          </span>
                          {qty > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-dark text-[10px] font-black text-white">
                              {qty}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. Special Instructions */}
            <div>
              <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-brand-dark/50">
                Special Instructions
              </p>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special requests? (e.g. less spicy, extra sauce)"
                rows={2}
                className="w-full resize-none rounded-[12px] border border-gray-200 bg-[#fbf7f2] px-3 py-2.5 text-xs font-medium text-brand-dark placeholder:text-brand-dark/35 focus:border-brand-primary/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all"
              />
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
              <div className="flex h-11 w-full shrink-0 items-center justify-between gap-1 rounded-full border border-brand-primary/25 bg-[#fbf7f2] px-2 shadow-sm sm:w-auto">
                <button
                  type="button"
                  onClick={handleLocalDecrease}
                  disabled={variants.length > 0 && !localSelectedVariant}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xl font-medium text-brand-dark transition-colors hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-30"
                >
                  −
                </button>
                <span className="flex min-w-[1.75rem] items-center justify-center text-center text-sm font-black tabular-nums leading-none text-brand-dark">
                  {variants.length > 0 ? (currentSelectedVariantQty > 0 ? currentSelectedVariantQty : 1) : baseQuantity}
                </span>
                <button
                  type="button"
                  onClick={handleLocalIncrease}
                  disabled={variants.length > 0 && !localSelectedVariant}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xl font-medium text-brand-dark transition-colors hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-30"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                className="flex h-11 w-full min-w-0 items-center justify-center whitespace-nowrap rounded-full bg-brand-primary px-4 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-[0_8px_20px_rgba(248,114,5,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e96500] sm:flex-1"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function ItemManagementModal({
  isOpen,
  onClose,
  onRemove,
  product,
  selectedVariant,
  quantity,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
  product: ProductWithOptionalDetails;
  selectedVariant?: ProductVariant;
  quantity: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!isOpen || !mounted) return null;
  const categoryName = getCategoryName(product.category);
  const cleanName = cleanProductName(product.name, categoryName);
  const isUrdu = isUrduText(cleanName);

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3 sm:p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* 780×570 card */}
      <div
        className="relative flex flex-col w-full overflow-hidden rounded-[24px] bg-white shadow-2xl"
        style={{ maxWidth: "560px", height: "min(420px, 92vh)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── TOP ~63%: full-width product image ── */}
        <div
          className="relative w-full shrink-0 overflow-hidden"
          style={{ height: "59%" }}
        >
          <Image
            src={productImageUrl(product.image, product.name, categoryName)}
            alt={cleanName}
            fill
            className="object-cover"
            unoptimized
          />
          {/* gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

          {/* Close button overlaid on image */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:text-brand-primary"
            aria-label="Close"
          >
            <span className="text-xl font-black leading-none">×</span>
          </button>

          {/* Variant badge */}
          {selectedVariant?.name && (
            <div className="absolute bottom-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/90 backdrop-blur-sm px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                {selectedVariant.name}
              </span>
            </div>
          )}
        </div>

        {/* ── BOTTOM ~37%: confirmation controls ── */}
        <div className="flex flex-1 flex-col justify-between bg-white px-6 py-5">
          <div>
            {/* Label */}
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-brand-primary mb-1">
              Manage item
            </p>
            <h3
              className={`font-black text-brand-dark leading-tight ${
                isUrdu ? "font-ama-dhaba text-2xl" : "text-lg sm:text-xl uppercase"
              }`}
            >
              {cleanName}
            </h3>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dark/50">
                Qty: {quantity}
              </span>
              {selectedVariant?.name && (
                <>
                  <span className="text-brand-dark/20">•</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary">
                    {selectedVariant.name}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border-2 border-gray-200 bg-white py-2.5 px-4.5 text-[10px] font-black uppercase tracking-widest text-brand-dark transition-all hover:border-brand-primary hover:text-brand-primary"
            >
              Keep item
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="flex-1 rounded-full bg-brand-primary py-2.5 px-4.5 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_8px_20px_rgba(248,114,5,0.28)] transition-all hover:bg-[#e96500] hover:shadow-[0_12px_28px_rgba(248,114,5,0.35)] hover:-translate-y-0.5"
            >
              Remove item
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// ─────────────────────────────────────────────────────────────────────────────
// VariantProductCard
// ─────────────────────────────────────────────────────────────────────────────
export function VariantProductCard({
  product,
  onAddToCart,
}: {
  product: ProductWithOptionalDetails;
  onAddToCart: (product: Product, variant?: ProductVariant) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [modalQuantity, setModalQuantity] = useState(1);
  const { cart, removeFromCart } = useCart();
  const variants = getUniqueVariants(product.variants);

  const basePrice = product.price > 0 ? product.price : (variants[0]?.price ?? 0);
  const displayPrice = basePrice > 0 ? `Rs. ${basePrice.toLocaleString()}` : "Ask";
  const isActive = product.status ? product.status === "ACTIVE" : true;
  
  const categoryName = getCategoryName(product.category);
  const cleanName = cleanProductName(product.name, categoryName);
  const isUrdu = isUrduText(cleanName);

  useEffect(() => {
    if (!variants.length) {
      setSelectedVariant(undefined);
      return;
    }
    if (!selectedVariant || !variants.some((variant) => variant.id === selectedVariant.id)) {
      setSelectedVariant(variants[0]);
    }
  }, [selectedVariant, variants]);

  const totalProductQty = Array.isArray(cart) ? cart.reduce((acc, c) => (c?.item?.id === product.id ? acc + c.quantity : acc), 0) : 0;
  const activeVariant = selectedVariant && variants.some(v => v.id === selectedVariant.id) ? selectedVariant : variants[0];

  const handleOpenModal = (event: ReactMouseEvent<HTMLElement>, variant?: ProductVariant) => {
    if (!isActive) return;
    event.preventDefault();
    setSelectedVariant(variant || variants[0]);
    setModalQuantity(1);
    setIsModalOpen(true);
  };

  const handleConfirmAddToCart = () => {
    for (let index = 0; index < modalQuantity; index += 1) {
      onAddToCart(product, activeVariant);
    }
    setModalQuantity(1);
    setIsModalOpen(false);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    setIsManageOpen(false);
  };

  return (
    <>
      <article
        className="group relative h-[250px] sm:h-[270px] lg:h-[290px] xl:h-[300px] w-full overflow-hidden rounded-[18px] bg-white shadow-[0_4px_16px_rgba(17,24,39,0.06)] ring-1 ring-brand-primary/10 transition-all duration-300 hover:-translate-y-1 hover:ring-brand-primary/25 hover:shadow-[0_12px_24px_rgba(248,114,5,0.12)] cursor-pointer"
        onClick={(e) => handleOpenModal(e)}
        style={{
          backgroundImage: `url(${productImageUrl(product.image, product.name, categoryName)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-label={cleanName}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/10 to-transparent transition-opacity duration-300" />

        <div className="absolute inset-x-2 bottom-2 z-10 rounded-[14px] border border-white/20 bg-white/95 p-3 shadow-lg backdrop-blur-md sm:inset-x-2.5 sm:bottom-2.5" onClick={e => e.stopPropagation()}>
          <h3
            className={`mb-1 line-clamp-1 break-words font-black leading-tight text-brand-dark transition-colors group-hover:text-brand-primary ${
              isUrdu ? "font-ama-dhaba text-xl lg:text-2xl mt-0.5" : "text-sm sm:text-base uppercase"
            }`}
            title={cleanName}
          >
            {cleanName}
          </h3>

          <div className="flex items-center justify-between mt-1 mb-2">
            <p className="text-[10px] font-bold text-brand-dark/50">
              From <span className="text-sm font-black text-brand-primary">{displayPrice}</span>
            </p>
          </div>

          <div className="flex w-full items-center justify-center">
            {totalProductQty > 0 ? (
              <div className="flex w-full h-[36px] items-center justify-between rounded-full border border-brand-primary/20 bg-transparent px-1.5 shadow-sm">
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsManageOpen(true); }}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-brand-dark transition-colors hover:text-brand-primary text-xl font-medium"
                >
                  −
                </button>
                <span className="min-w-[2rem] flex items-center justify-center text-sm font-black text-brand-dark tabular-nums leading-none">{totalProductQty}</span>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleOpenModal(e); }}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-brand-dark transition-colors hover:text-brand-primary text-xl font-medium"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                disabled={!isActive}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleOpenModal(e); }}
                className="flex w-full h-[36px] items-center justify-center rounded-full bg-brand-primary px-4 text-[10px] font-black uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e96500] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-80"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </article>

      <ProductQuickAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        selectedVariant={activeVariant}
        onSelectVariant={(variant) => {
          setSelectedVariant(variant);
          setModalQuantity(1); // Explicitly resets quantity when a new variant is picked
        }}
        quantity={modalQuantity}
        onIncrease={() => setModalQuantity((value) => value + 1)}
        onDecrease={() => setModalQuantity((value) => Math.max(1, value - 1))}
        onConfirm={handleConfirmAddToCart}
      />

      <ItemManagementModal
        isOpen={isManageOpen}
        onClose={() => setIsManageOpen(false)}
        onRemove={handleRemove}
        product={product}
        selectedVariant={activeVariant}
        quantity={totalProductQty}
      />
    </>
  );
}

function SkeletonCard() {
  return (
    <div className="relative flex flex-col items-center text-center p-6 rounded-[18px] bg-gray-100 border border-gray-200 animate-pulse h-[250px]">
      <div className="h-full w-full bg-gray-200 rounded-xl" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CartItem adapter
// ─────────────────────────────────────────────────────────────────────────────
function toCartItem(product: Product, variant?: ProductVariant) {
  const categoryName = getCategoryName(product.category);
  const safeVariants = getUniqueVariants(product.variants);
  const price =
    variant?.price ??
    (safeVariants.length > 0
      ? Math.min(...safeVariants.map((option) => option.price || 0))
      : (product.price || 0));

  return {
    id: product.id,
    name: cleanProductName(product.name, categoryName),
    nameUr: "",
    price: `Rs. ${price.toLocaleString()}`,
    image: productImageUrl(product.image, product.name, categoryName),
    category: categoryName,
    description: "",
    descriptionUr: "",
    slug: product.id,
    popular: false,
    unitPrice: price,
    variants: safeVariants.map((option) => ({
      id: option.id,
      name: option.name,
      price: option.price,
    })),
    selectedVariantId: variant?.id,
    selectedVariantName: variant?.name,
    details: { prepTime: "20-30 min", prepTimeUr: "20-30 منٹ" },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main OrderPage
// ─────────────────────────────────────────────────────────────────────────────
export default function OrderPage() {
  const { t, language } = useLanguage();
  const { cart, addToCart } = useCart();
  const searchParams = useSearchParams();
  const { isSelfOrder, table, successMessage, errorMessage } = useSelfOrder();

  const { isLoading, isError, error, refetch } = useProducts(
    isSelfOrder && table?.businessId ? { businessId: table.businessId } : undefined,
  );
  const {
    filteredProducts,
    categories,
    activeCategory,
    searchQuery,
    changeCategory,
    changeSearch,
  } = useProductFilters();

  const [searchOpen, setSearchOpen] = useState(Boolean(searchQuery));

  useEffect(() => {
    const requestedCategory = searchParams.get("category")?.trim();
    if (!requestedCategory) return;
    if (requestedCategory !== activeCategory && Array.isArray(categories) && categories.includes(requestedCategory)) {
      changeCategory(requestedCategory);
    }
  }, [activeCategory, categories, changeCategory, searchParams]);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = useCallback(
    (raw: string) => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
      searchTimer.current = setTimeout(() => changeSearch(raw), 350);
    },
    [changeSearch]
  );

  useEffect(() => {
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, []);

  const handleAddToCart = useCallback(
    (product: Product, variant?: ProductVariant) => {
      addToCart(toCartItem(product, variant));
    },
    [addToCart]
  );

  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeProducts = Array.isArray(filteredProducts) ? filteredProducts : [];

  return (
    <div className="mt-20 flex min-h-[calc(100svh-80px)] flex-col bg-[#fbf7f2] font-sans pb-28">
      <div className="relative mx-auto flex w-full max-w-[1720px] flex-1 flex-col px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">

        {/* ── Main Menu Panel ── */}
        <div className="flex-1 bg-[#fbf7f2]">
          <div className="mb-5 rounded-[20px] border border-brand-primary/10 bg-white/35 p-4 sm:p-6 shadow-[0_8px_24px_rgba(17,24,39,0.03)] backdrop-blur-sm sm:mb-6">
            <h1 className={`mb-1 text-2xl sm:text-3xl font-black tracking-tight text-[#111827] lg:text-4xl ${language === "UR" ? "text-right font-ama-dhaba" : ""}`}>
              {isSelfOrder ? `Table ${table?.tableNumber}` : t("orderDelivery")}
            </h1>
            <p className={`mb-5 text-xs sm:text-sm font-semibold text-[#111827]/70 lg:text-base ${language === "UR" ? "text-right" : ""}`}>
              {isSelfOrder
                ? "Browse the menu and send your order to the waiter. It is confirmed after approval."
                : t("exclusiveChefMeals")}
            </p>
            {isSelfOrder && successMessage ? (
              <p className="mb-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
                {successMessage}
              </p>
            ) : null}
            {isSelfOrder && errorMessage ? (
              <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {errorMessage}
              </p>
            ) : null}

            <div className="mb-6 flex justify-center w-full">
              <div className="relative w-full max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <svg className="h-5 w-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Search dishes (e.g. Biryani, بریانی)..."
                  defaultValue={searchQuery}
                  onFocus={() => setSearchOpen(true)}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full h-11 sm:h-12 rounded-full border border-brand-primary/20 bg-white/90 py-2.5 pl-12 pr-5 text-xs sm:text-sm font-bold text-brand-dark outline-none shadow-sm transition-all duration-300 placeholder:text-brand-dark/40 focus:border-brand-primary/40 focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                />
              </div>
            </div>

            {/* Category Bar */}
            <div className="relative flex items-center">
              <div
                className={`mx-auto flex max-w-full gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar flex-nowrap justify-start scroll-smooth snap-x snap-mandatory lg:justify-center ${language === "UR" ? "flex-row-reverse" : ""}`}
              >
                {safeCategories.map((cat) => {
                  const normalizedCategory = cat === "ڈیس" ? "Desi" : cat;
                  const imageSrc = CATEGORY_IMAGE_MAP[cat] || CATEGORY_IMAGE_MAP[normalizedCategory];
                  const isActive = activeCategory === cat;
                  const displayName = CATEGORY_DISPLAY_MAP[cat] || CATEGORY_DISPLAY_MAP[normalizedCategory] || cat;
                  
                  return (
                    <button
                      key={cat}
                      onClick={() => changeCategory(cat)}
                      className={`relative flex-none min-w-[95px] sm:min-w-[110px] md:min-w-[120px] max-w-[130px] flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-[16px] px-2.5 py-2.5 sm:px-3 sm:py-3 text-center text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                        imageSrc
                          ? isActive
                            ? "text-white shadow-[0_8px_20px_rgba(248,114,5,0.18)] border border-brand-primary"
                            : "border border-white/25 text-white"
                          : isActive
                            ? "border border-brand-primary/25 bg-transparent text-brand-primary"
                            : "border border-brand-primary/15 bg-transparent text-brand-primary hover:bg-brand-primary/5"
                      }`}
                      style={imageSrc ? {
                        backgroundImage: `url(${imageSrc})`,
                        backgroundPosition: "center 20%",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      } : undefined}
                    >
                      {imageSrc && (
                        <span className={`absolute inset-0 ${isActive ? "bg-brand-primary/55" : "bg-black/30"}`} />
                      )}
                      <span className={`relative z-10 ${imageSrc && isUrduText(displayName) ? "font-ama-dhaba text-base sm:text-lg" : "font-sans"}`}>
                        {String(displayName).toLowerCase() === "all" ? "ALL" : displayName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>          
          </div>

          {/* Error State */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                </svg>
              </div>
              <div>
                <p className="font-black text-brand-dark text-xl mb-1">Failed to load menu</p>
                <p className="text-brand-dark/50 text-sm mb-5">{String(error || "")}</p>
                <button
                  onClick={() => refetch()}
                  className="px-8 py-3.5 bg-brand-primary text-white font-black text-sm uppercase tracking-widest rounded-full shadow-md hover:shadow-[0_12px_24px_rgba(248,114,5,0.3)] hover:-translate-y-0.5 transition-all"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && safeProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <span className="text-6xl drop-shadow-md">🍽️</span>
              <p className="font-black text-brand-dark text-xl">No dishes found</p>
              <p className="text-brand-dark/50 text-sm">Try a different search or category.</p>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 pt-2 items-stretch">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
              : safeProducts.map((product) => (
                <VariantProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CartContent Component
// ─────────────────────────────────────────────────────────────────────────────
function numericCartPrice(item: any) {
  if (!item) return 0;
  if (typeof item.unitPrice === "number") return item.unitPrice;
  if (typeof item.price === "number") return item.price;
  return Number.parseInt(String(item.price || "").replace(/[^0-9]/g, ""), 10) || 0;
}

function money(value: number) {
  return `Rs. ${value.toLocaleString()}`;
}

export function CartContent({
  cart,
  language,
  t,
  updateQuantity,
  updateVariant,
}: {
  cart: any[];
  language: string;
  t: (key: string) => string;
  updateQuantity: (id: any, delta: number, variantId?: any) => void;
  updateVariant: (id: any, variant: any, oldVariantId?: any) => void;
}) {
  const [openDetailKey, setOpenDetailKey] = useState<string | null>(null);
  const safeCart = Array.isArray(cart) ? cart : [];

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#fbf7f2]">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 no-scrollbar sm:px-6">
        {safeCart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-4 text-center text-brand-dark/70">
            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
              <svg className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="mb-1 text-xl font-black text-brand-dark">{t("emptyCart")}</p>
            <p className="max-w-xs text-sm font-medium leading-6">Choose a dish and tap an option to build your order.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {safeCart.map((c: any, i: number) => {
              if (!c || !c.item) return null;
              const cartKey = `${c.item.id}-${i}`;
              const unitPrice = numericCartPrice(c.item);
              const safeCartVariants = getUniqueVariants(c.item.variants);
              
              const selectedVariant = c.variantQuantities && Object.keys(c.variantQuantities).length > 0
                ? Object.entries(c.variantQuantities)
                    .filter(([_, qty]) => (qty as number) > 0)
                    .map(([vId, qty]) => {
                      const variant = c.item.variants?.find((v: any) => String(v.id) === String(vId));
                      return `${qty} x ${variant?.name || vId}`;
                    })
                    .join(", ")
                : (c.item.selectedVariantName ||
                    safeCartVariants.find((variant) => variant.id === c.item.selectedVariantId)?.name ||
                    "Standard");

              const lineTotal = c.variantQuantities && Object.keys(c.variantQuantities).length > 0
                ? Object.entries(c.variantQuantities).reduce((sum, [vId, qty]) => {
                    const variant = c.item.variants?.find((v: any) => String(v.id) === String(vId));
                    const price = variant?.price ?? unitPrice;
                    return sum + price * (qty as number);
                  }, 0)
                : unitPrice * (c.quantity || 1);

              const hasCartDetails = Boolean(c.item.details?.prepTime) || Boolean(c.item.category) || Boolean(safeCartVariants.length);
              const cartDetailsOpen = openDetailKey === cartKey;
              
              const cleanName = cleanProductName(c.item.name || "", c.item.category);
              const isUrdu = isUrduText(cleanName);

              return (
                <div
                  key={cartKey}
                  className={`rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_12px_32px_rgba(17,24,39,0.045)] transition-all duration-300 hover:border-brand-primary/20 ${language === "UR" ? "text-right" : ""}`}
                >
                  <div className={`grid grid-cols-[72px_minmax(0,1fr)] gap-4 sm:grid-cols-[80px_minmax(0,1fr)] ${language === "UR" ? "direction-rtl" : ""}`}>
                    <div className="cart-item-image relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-primary/10 bg-[#fbf7f2] sm:h-[80px] sm:w-[80px]">
                      <Image
                        src={c.item.image || "/images/placeholder-food.png"}
                        alt={cleanName}
                        fill
                        className="!h-full !w-full !object-cover !object-center"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        unoptimized
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className={`flex items-start justify-between gap-2 ${language === "UR" ? "flex-row-reverse" : ""}`}>
                        <div className="min-w-0">
                          <h4 className={`text-base font-black leading-tight text-brand-dark ${isUrdu ? "font-ama-dhaba text-2xl" : "uppercase"}`}>
                            {cleanName}
                          </h4>
                          <p className="mt-1 text-xs font-black uppercase tracking-widest text-brand-primary">
                            {selectedVariant}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-xl bg-brand-primary/10 px-3 py-1.5 text-[11px] font-black text-brand-primary">
                          x{c.quantity}
                        </span>
                      </div>

                      {hasCartDetails && (
                        <button
                          type="button"
                          onClick={() => setOpenDetailKey(cartDetailsOpen ? null : cartKey)}
                          className="mt-3 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-brand-dark/60 transition-colors hover:border-brand-primary hover:text-brand-primary"
                          aria-expanded={cartDetailsOpen}
                        >
                          {cartDetailsOpen ? "Hide details" : "Details"}
                        </button>
                      )}

                      {c.variantQuantities && Object.keys(c.variantQuantities).length > 0 ? (
                        <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                          {Object.entries(c.variantQuantities)
                            .filter(([_, qty]) => (qty as number) > 0)
                            .map(([vId, qty]) => {
                              const variantObj = c.item.variants?.find((v: any) => String(v.id) === String(vId));
                              const vName = variantObj?.name || vId;
                              const vPrice = variantObj?.price || unitPrice;
                              return (
                                <div key={vId} className="flex items-center justify-between text-xs text-brand-dark/70 font-semibold bg-[#fbf7f2] p-2 rounded-xl border border-brand-primary/5">
                                  <span>{vName} Portion (Rs. {vPrice.toLocaleString()})</span>
                                  <div className="flex items-center gap-1.5 rounded-xl bg-white p-1 shadow-sm">
                                    <button
                                      onClick={() => updateQuantity(c.item.id, -1, vId)}
                                      className="flex h-6 w-6 items-center justify-center rounded-lg text-brand-dark hover:text-brand-primary"
                                      aria-label="Decrease portion quantity"
                                    >
                                      −
                                    </button>
                                    <span className="w-5 text-center font-bold">{qty as number}</span>
                                    <button
                                      onClick={() => updateQuantity(c.item.id, 1, vId)}
                                      className="flex h-6 w-6 items-center justify-center rounded-lg text-brand-dark hover:text-brand-primary"
                                      aria-label="Increase portion quantity"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      ) : (
                        <div className="mt-4 grid grid-cols-1 items-stretch gap-3 rounded-2xl bg-[#fbf7f2] p-2 min-[420px]:grid-cols-[1fr_auto_1fr] min-[420px]:items-center">
                          <div>
                            <span className="block text-[9px] font-black uppercase tracking-widest text-brand-dark/40">Price</span>
                            <span className="block text-sm font-black text-brand-dark">{money(unitPrice)}</span>
                          </div>

                          <div className={`flex items-center justify-center gap-1.5 rounded-xl bg-white p-1 shadow-sm ${language === "UR" ? "flex-row-reverse" : ""}`}>
                            <button
                              onClick={() => updateQuantity(c.item.id, -1)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl text-brand-dark transition-colors hover:bg-[#fbf7f2] hover:text-brand-primary"
                              aria-label="Decrease quantity"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="flex h-8 w-8 items-center justify-center text-center text-base font-black text-brand-dark">{c.quantity}</span>
                            <button
                              onClick={() => updateQuantity(c.item.id, 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl text-brand-dark transition-colors hover:bg-[#fbf7f2] hover:text-brand-primary"
                              aria-label="Increase quantity"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          <div className="min-[420px]:text-right">
                            <span className="block text-[9px] font-black uppercase tracking-widest text-brand-dark/40">Total</span>
                            <span className="block text-sm font-black text-brand-primary">{money(lineTotal)}</span>
                          </div>
                        </div>
                      )}

                      {c.variantQuantities && Object.keys(c.variantQuantities).length > 0 && (
                        <div className="mt-3 flex items-center justify-between text-xs font-black text-brand-dark border-t border-gray-100 pt-2">
                          <span>Total Item Price:</span>
                          <span className="text-sm text-brand-primary">{money(lineTotal)}</span>
                        </div>
                      )}

                      {cartDetailsOpen && (
                        <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-3 text-xs font-bold leading-5 text-brand-dark/60">
                          <div className="grid gap-1.5">
                            {Boolean(c.item.category) && <span>Category: {String(c.item.category)}</span>}
                            {c.item.details?.prepTime && <span>Prep time: {c.item.details.prepTime}</span>}
                            <span>Selected: {selectedVariant}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}