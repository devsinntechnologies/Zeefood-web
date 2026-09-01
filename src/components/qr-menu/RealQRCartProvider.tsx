"use client";

import { useMemo, type ReactNode } from "react";
import { useCart, type CartProduct } from "@/context/CartContext";
import { QRCartContext, type QRCartContextType } from "@/components/qr-menu/QRCartContext";
import type { MenuItem, QRCartLine } from "@/types/qr-menu.types";

/**
 * Backs the exact same context `useQRCart()` reads from (MenuItem, MenuItemSheet,
 * FloatingOrderBar, OrderReview all consume it unmodified) with the site's real
 * cart instead of the standalone mock cart — so the QR-menu design can drive
 * real checkout for real tables. Callers not in a real product context should
 * use QRCartProvider (mock) instead.
 *
 * Products can have variants; this bridge keeps things simple by always
 * operating on a single variant per product (the one `buildCartProduct`
 * resolves for a given item id — the cheapest one), same as tapping "+ Add"
 * would without opening a size picker.
 */
export function RealQRCartProvider({
  children,
  buildCartProduct,
}: {
  children: ReactNode;
  /** Resolves a MenuItem id back to the real CartProduct (with a variant already chosen) to add. */
  buildCartProduct: (itemId: string) => CartProduct | undefined;
}) {
  const { cart, addToCart, removeFromCart, updateQuantity: realUpdateQuantity, clearCart, cartCount, cartTotal } =
    useCart();

  const findEntry = (itemId: string) => cart.find((entry) => String(entry.item.id) === String(itemId));

  const lines: QRCartLine[] = useMemo(
    () =>
      cart.map((entry) => {
        const item: MenuItem = {
          id: String(entry.item.id),
          slug: String(entry.item.slug ?? entry.item.id),
          name: entry.item.name ?? "",
          description: "",
          price: entry.item.unitPrice ?? 0,
          image: entry.item.image ?? "",
        };
        return { item, quantity: entry.quantity };
      }),
    [cart],
  );

  const quantityFor = (itemId: string) => findEntry(itemId)?.quantity ?? 0;

  const addItem = (item: MenuItem, quantity: number) => {
    const entry = findEntry(item.id);
    if (!entry) {
      const cartProduct = buildCartProduct(item.id);
      if (!cartProduct) return;
      addToCart(cartProduct);
      if (quantity > 1) realUpdateQuantity(item.id, quantity - 1, cartProduct.selectedVariantId);
      return;
    }
    const delta = quantity - entry.quantity;
    if (delta !== 0) realUpdateQuantity(item.id, delta, entry.item.selectedVariantId);
  };

  const removeItem = (itemId: string) => removeFromCart(itemId);

  const updateQuantity = (itemId: string, delta: number) => {
    const entry = findEntry(itemId);
    if (!entry && delta > 0) {
      const cartProduct = buildCartProduct(itemId);
      if (!cartProduct) return;
      addToCart(cartProduct);
      if (delta > 1) realUpdateQuantity(itemId, delta - 1, cartProduct.selectedVariantId);
      return;
    }
    realUpdateQuantity(itemId, delta, entry?.item.selectedVariantId);
  };

  const value: QRCartContextType = {
    lines,
    addItem,
    removeItem,
    updateQuantity,
    quantityFor,
    clearCart,
    cartCount,
    cartTotal,
  };

  return <QRCartContext.Provider value={value}>{children}</QRCartContext.Provider>;
}
