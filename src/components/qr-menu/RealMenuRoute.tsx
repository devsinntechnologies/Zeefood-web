"use client";

import { useCallback, useMemo, useState } from "react";
import { useSelfOrder } from "@/context/SelfOrderContext";
import { useProducts, useProductFilters } from "@/hooks/useProducts";
import type { Product } from "@/lib/store";
import {
  cleanProductName,
  getCategoryName,
  getUniqueVariants,
  productImageUrl,
  toCartItem,
} from "@/components/order/OrderPage";
import type { MenuCategory } from "@/types/qr-menu.types";
import { RealQRCartProvider } from "@/components/qr-menu/RealQRCartProvider";
import QRMenuLayout from "@/components/qr-menu/QRMenuLayout";

function cheapestVariant(product: Product) {
  const variants = getUniqueVariants(product.variants);
  if (variants.length === 0) return undefined;
  return variants.reduce((min, v) => ((v.price || 0) < (min.price || 0) ? v : min), variants[0]);
}

function RealQRMenuExperience({ businessId }: { businessId: string }) {
  const { table, successMessage, errorMessage, submitOrder } = useSelfOrder();
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const { products, isLoading, isError, error, refetch } = useProducts({ businessId });
  // Category tabs/search inside QRMenuLayout filter client-side over the full
  // list (same pattern as the mock design), so we don't drive redux's own
  // active-category/search state here — `filteredProducts` stays at its
  // default (all products, no search) for this businessId.
  const { filteredProducts } = useProductFilters();

  const productsById = useMemo(() => {
    const map = new Map<string, Product>();
    for (const product of products) map.set(String(product.id), product);
    return map;
  }, [products]);

  const buildCartProduct = useCallback(
    (itemId: string) => {
      const product = productsById.get(String(itemId));
      if (!product) return undefined;
      return toCartItem(product, cheapestVariant(product));
    },
    [productsById],
  );

  const menuCategories: MenuCategory[] = useMemo(() => {
    const byCategory = new Map<string, MenuCategory>();
    for (const product of filteredProducts) {
      if (product.status && product.status !== "ACTIVE") continue;
      const categoryName = getCategoryName(product.category) || "Menu";
      if (!byCategory.has(categoryName)) {
        byCategory.set(categoryName, { id: categoryName, name: categoryName, items: [] });
      }
      const variants = getUniqueVariants(product.variants);
      const price = variants.length > 0 ? Math.min(...variants.map((v) => v.price || 0)) : product.price || 0;
      byCategory.get(categoryName)!.items.push({
        id: String(product.id),
        slug: String(product.id),
        name: cleanProductName(product.name, categoryName),
        description: "",
        price,
        image: productImageUrl(product.image, product.name, categoryName),
      });
    }
    return Array.from(byCategory.values());
  }, [filteredProducts]);

  const handleConfirmOrder = useCallback(async () => {
    await submitOrder();
    setIsReviewOpen(false);
  }, [submitOrder]);

  const banner =
    successMessage || errorMessage ? (
      <div className="px-4 pt-3 sm:px-5">
        <p
          className={`rounded-2xl px-4 py-2.5 text-xs font-bold ${
            successMessage ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"
          }`}
        >
          {successMessage || errorMessage}
        </p>
      </div>
    ) : null;

  if (isLoading) {
    return <div className="min-h-[100dvh] bg-[#fbf7f2]" />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-[#fbf7f2] px-6 text-center">
        <p className="text-lg font-black text-brand-dark">Failed to load menu</p>
        <p className="text-sm text-brand-dark/50">{String(error || "")}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-full bg-brand-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <RealQRCartProvider buildCartProduct={buildCartProduct}>
      <QRMenuLayout
        tableNumber={table?.tableNumber ?? ""}
        categories={menuCategories}
        banner={banner}
        isReviewOpen={isReviewOpen}
        onOpenReview={() => setIsReviewOpen(true)}
        onCloseReview={() => setIsReviewOpen(false)}
        onConfirmOrder={handleConfirmOrder}
      />
    </RealQRCartProvider>
  );
}

/** Real, backend-connected version of the QR-menu design — used for real table QR scans. */
export default function RealMenuRoute() {
  const { table } = useSelfOrder();
  if (!table?.businessId) return null;
  return <RealQRMenuExperience key={table.businessId} businessId={table.businessId} />;
}
