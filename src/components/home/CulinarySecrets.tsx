"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { VariantProductCard } from "@/components/order/OrderPage";
import { API_BASE_URL } from "@/lib/api";
import type { Product, ProductVariant } from "@/lib/store";

type RemoteProduct = {
  id: string;
  name: string;
  image?: string | null;
  price?: number;
  status?: string;
  sortOrder?: number;
  inStock?: number;
  categoryId?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: {
    id?: string;
    CategoryName?: string;
    CategoryNameUr?: string;
  };
  variants?: ProductVariant[];
};

const craftNotes = [
  "Masala is bloomed slowly for depth.",
  "Fresh batches keep rice, herbs, and sauces bright.",
  "Final garnish happens close to dispatch.",
];

const EXCLUDED_KITCHEN_CATEGORIES = ["mashrobat", "azafi ashia", "اضافی اشیاء", "مشروبات"];
const FEATURED_KITCHEN_CATEGORIES = ["desi", "frozen", "chat", "chaat", "achar"];
const EXCLUDED_KITCHEN_PRODUCTS = ["sandal bottal", "pan masala", "dal mung", "bottal", "bottle"];

function normalizeImage(image?: string | null) {
  const imgStr = (image || "").trim();
  if (imgStr) {
    if (imgStr.startsWith("http://") || imgStr.startsWith("https://")) return imgStr;
    if (imgStr.startsWith("/uploads/") || imgStr.startsWith("uploads/")) {
      return `${API_BASE_URL}/${imgStr.replace(/^\//, "")}`;
    }
    return imgStr.startsWith("/") ? imgStr : `/${imgStr}`;
  }
  return "/fiery-wok.png";
}

function toProduct(product: RemoteProduct): Product {
  const variants = product.variants ?? [];
  const variantPrices = variants.map((variant) => Number(variant.price || 0)).filter(Boolean);
  const price = variantPrices.length > 0 ? Math.min(...variantPrices) : Number(product.price || 0);
  const categoryName = product.category?.CategoryName ?? "Fresh";
  const categoryId = product.category?.id ?? product.categoryId ?? categoryName;
  const status = product.status === "INACTIVE" ? "INACTIVE" : "ACTIVE";

  return {
    id: product.id,
    name: product.name,
    price,
    image: normalizeImage(product.image),
    status,
    sortOrder: product.sortOrder ?? 0,
    inStock: product.inStock ?? (status === "ACTIVE" ? 99 : 0),
    categoryId,
    category: { id: categoryId, CategoryName: categoryName },
    variants,
    createdAt: product.createdAt ?? "",
    updatedAt: product.updatedAt ?? "",
  };
}

function categoryRank(product: RemoteProduct) {
  const category = product.category?.CategoryName?.toLowerCase() ?? "";
  const preferredIndex = FEATURED_KITCHEN_CATEGORIES.findIndex((name) => category.includes(name));
  return preferredIndex === -1 ? FEATURED_KITCHEN_CATEGORIES.length : preferredIndex;
}

function isKitchenFeature(product: RemoteProduct) {
  const category = product.category?.CategoryName?.toLowerCase() ?? "";
  const productName = product.name.toLowerCase();

  return (
    product.status !== "INACTIVE" &&
    Boolean(product.image) &&
    !EXCLUDED_KITCHEN_CATEGORIES.some((name) => category.includes(name) || productName.includes(name)) &&
    !EXCLUDED_KITCHEN_PRODUCTS.some((name) => productName.includes(name))
  );
}

export default function CulinarySecrets() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        const res = await fetch("/api/products?page=1&limit=60");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const apiProducts: RemoteProduct[] = Array.isArray(json.data) ? json.data : [];
        const featured = apiProducts
          .filter(isKitchenFeature)
          .sort((a, b) => categoryRank(a) - categoryRank(b))
          .slice(0, 3)
          .map(toProduct);

        if (mounted) setProducts(featured);
      } catch (error) {
        console.error("Failed to load culinary products:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#fbf7f2] pb-7 pt-3 sm:pb-8 sm:pt-4 lg:pb-10 lg:pt-5">
      <div className="site-container">
        <div className="rounded-[26px] border border-brand-primary/10 bg-white/35 p-4 shadow-[0_18px_55px_rgba(17,24,39,0.055)] backdrop-blur-sm sm:p-5 lg:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(18rem,0.44fr)_1fr] lg:items-start lg:gap-5 2xl:gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-black uppercase tracking-[0.34em] text-brand-primary">
                From our kitchen
              </span>
              <h2 className="mt-2 text-[clamp(2rem,8vw,3rem)] font-black uppercase leading-[0.95] tracking-tight text-brand-dark lg:text-5xl">
                Crafted daily, served warm
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-brand-dark/68 sm:text-base">
                A tighter look at the real dishes moving through Ama G Ka Dhaba: honest prep, rich desi aroma, and finishing touches that keep every order fresh.
              </p>

              <div className="mt-4 grid gap-2">
                {craftNotes.map((note, index) => (
                  <div key={note} className="flex items-center gap-3 rounded-2xl border border-brand-primary/10 bg-[#fffdf8]/70 px-3 py-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-black text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-bold text-brand-dark/72">{note}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/menu"
                className="mt-4 hidden min-h-11 items-center justify-center rounded-2xl bg-brand-primary px-7 text-sm font-black uppercase tracking-widest text-white no-underline shadow-[0_12px_26px_rgba(248,114,5,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary/90 hover:no-underline lg:inline-flex"
              >
                View Menu
              </Link>
            </div>

            <div className="fluid-food-grid grid items-stretch gap-2.5 sm:gap-3">
              {loading &&
                [0, 1, 2].map((item) => (
                  <div key={item} className="min-h-[500px] animate-pulse rounded-2xl border border-gray-100 bg-white/70 shadow-sm" />
                ))}

              {!loading &&
                products.map((product) => (
                  <VariantProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(selectedProduct, variant) => {
                      const price = variant?.price ?? selectedProduct.price;
                      addToCart({
                        id: selectedProduct.id,
                        name: selectedProduct.name,
                        price,
                        unitPrice: price,
                        image: selectedProduct.image,
                        category: selectedProduct.category?.CategoryName ?? "Fresh",
                        slug: selectedProduct.id,
                        popular: false,
                        variants: selectedProduct.variants,
                        selectedVariantId: variant?.id,
                        selectedVariantName: variant?.name,
                        details: { prepTime: "20-30 min", prepTimeUr: "20-30 min" },
                      });
                    }}
                  />
                ))}
            </div>
          </div>

          <Link
            href="/menu"
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-brand-primary px-7 text-sm font-black uppercase tracking-widest text-white no-underline shadow-[0_12px_26px_rgba(248,114,5,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary/90 hover:no-underline lg:hidden"
          >
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
