"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { VariantProductCard } from "@/components/order/OrderPage";
import { API_BASE_URL } from "@/lib/api";
import type { Product, ProductVariant } from "@/lib/store";

type RemoteProduct = {
  id: string;
  name: string;
  slug?: string;
  image?: string;
  status?: string;
  category?: { CategoryName?: string };
  price?: number;
  variants?: ProductVariant[];
};

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
  const price = variantPrices.length > 0 ? Math.min(...variantPrices) : product.price || 0;
  const category = product.category?.CategoryName ?? "Desi";
  const status = product.status === "INACTIVE" ? "INACTIVE" : "ACTIVE";

  return {
    id: product.id,
    name: product.name,
    price,
    image: normalizeImage(product.image),
    status,
    sortOrder: 0,
    inStock: status === "ACTIVE" ? 99 : 0,
    categoryId: category,
    category: { id: category, CategoryName: category },
    variants,
    createdAt: "",
    updatedAt: "",
  };
}

export default function SignatureDesi() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [desiItems, setDesiItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/products?page=1&limit=100");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const products: RemoteProduct[] = json.data || [];
        const filtered = products
          .filter((product) => product.category?.CategoryName === "Desi")
          .slice(0, 4)
          .map(toProduct);

        if (mounted) setDesiItems(filtered);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to load products";
        if (mounted) setError(message);
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
    <section className="relative w-full bg-[#fbf7f2] pb-5 pt-5 sm:pb-6 sm:pt-6 lg:pb-7 lg:pt-7 2xl:pb-8 2xl:pt-8">
      <div className="site-container">
        <div className="mb-4 flex flex-col items-center py-0 text-center sm:mb-5 2xl:mb-6">
          <h2 className="text-[clamp(2rem,9vw,3rem)] font-black uppercase leading-none tracking-tight text-brand-primary lg:text-5xl">
            Signature
          </h2>
          <p lang="ur" dir="rtl" className="-mt-4 font-ama-dhaba text-[clamp(2.55rem,12vw,4rem)] font-black leading-none text-brand-primary lg:-mt-7 lg:text-6xl">
            دیسی
          </p>
          <div className="mb-2 mt-1.5 h-1.5 w-16 rounded-full bg-brand-primary" />
          <p className="max-w-2xl text-sm font-medium leading-relaxed text-brand-dark/70 sm:text-base">
            Experience the rich, authentic flavors of our heritage with perfectly crafted traditional recipes.
          </p>
        </div>

        <div className="fluid-food-grid grid items-stretch gap-3 pt-0 sm:gap-4 lg:gap-4 2xl:gap-5">
          {loading && <div className="col-span-full text-center">Loading...</div>}
          {error && <div className="col-span-full text-center text-red-500">{error}</div>}

          {!loading &&
            !error &&
            desiItems.map((product) => (
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
                    category: selectedProduct.category?.CategoryName ?? "Desi",
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

        <div className="mt-4 flex justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center rounded-2xl border-2 border-brand-primary bg-transparent px-9 py-3.5 font-black uppercase tracking-widest text-brand-primary no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-brand-primary hover:text-white hover:no-underline hover:shadow-[0_15px_30px_rgba(248,114,5,0.30)]"
          >
            {t("viewMenu")}
          </Link>
        </div>
      </div>
    </section>
  );
}
