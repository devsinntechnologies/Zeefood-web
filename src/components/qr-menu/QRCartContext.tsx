"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { MenuItem, QRCartLine } from "@/types/qr-menu.types";

// Cart state scoped entirely to the QR dine-in menu. Deliberately kept
// separate from the site-wide CartContext (used by delivery/pickup ordering)
// since this flow is a standalone frontend preview with no shared checkout.
interface QRCartContextType {
  lines: QRCartLine[];
  addItem: (item: MenuItem, quantity: number, note?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  quantityFor: (itemId: string) => number;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const QRCartContext = createContext<QRCartContextType | undefined>(undefined);

export function QRCartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<QRCartLine[]>([]);

  const addItem = (item: MenuItem, quantity: number, note?: string) => {
    setLines((prev) => {
      const existingIndex = prev.findIndex((line) => line.item.id === item.id);
      if (existingIndex > -1) {
        return prev.map((line, index) =>
          index === existingIndex ? { ...line, quantity, note } : line
        );
      }
      return [...prev, { item, quantity, note }];
    });
  };

  const removeItem = (itemId: string) => {
    setLines((prev) => prev.filter((line) => line.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, quantity: line.quantity + delta } : line
        )
        .filter((line) => line.quantity > 0)
    );
  };

  const quantityFor = (itemId: string) =>
    lines.find((line) => line.item.id === itemId)?.quantity ?? 0;

  const clearCart = () => setLines([]);

  const cartCount = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);
  const cartTotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity * line.item.price, 0),
    [lines]
  );

  return (
    <QRCartContext.Provider
      value={{ lines, addItem, removeItem, updateQuantity, quantityFor, clearCart, cartCount, cartTotal }}
    >
      {children}
    </QRCartContext.Provider>
  );
}

export function useQRCart() {
  const context = useContext(QRCartContext);
  if (context === undefined) {
    throw new Error("useQRCart must be used within a QRCartProvider");
  }
  return context;
}
