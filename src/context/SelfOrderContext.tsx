"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { BUSINESS_ID } from "@/lib/store/productsApi";

export type SelfOrderTable = {
  tableId: string;
  tableNumber: string;
  businessId: string;
  businessName?: string | null;
};

type SelfOrderContextValue = {
  isSelfOrder: boolean;
  table: SelfOrderTable | null;
  customerName: string;
  setCustomerName: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  submitting: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  registerTable: (table: SelfOrderTable | null) => void;
  submitOrder: () => Promise<boolean>;
};

const SelfOrderContext = createContext<SelfOrderContextValue | undefined>(undefined);

function cartToItems(cart: ReturnType<typeof useCart>["cart"]) {
  return cart.flatMap((entry) => {
    const productId = String(entry.item.id);
    if (entry.variantQuantities && Object.keys(entry.variantQuantities).length > 0) {
      return Object.entries(entry.variantQuantities)
        .filter(([, qty]) => Number(qty) > 0)
        .map(([variantId, quantity]) => ({
          productId,
          variantId,
          quantity: Number(quantity),
        }));
    }
    return [{ productId, quantity: entry.quantity }];
  });
}

export function SelfOrderProvider({ children }: { children: React.ReactNode }) {
  const { cart, clearCart } = useCart();
  const [table, setTable] = useState<SelfOrderTable | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const registerTable = useCallback((next: SelfOrderTable | null) => {
    setTable(next);
    setSuccessMessage(null);
    setErrorMessage(null);
  }, []);

  const submitOrder = useCallback(async () => {
    if (!table) {
      setErrorMessage("This QR table session is invalid.");
      return false;
    }
    const items = cartToItems(cart);
    if (items.length === 0) {
      setErrorMessage("Add items before placing an order.");
      return false;
    }

    setSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const response = await fetch("/api/self-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: table.businessId || BUSINESS_ID,
          tableId: table.tableId,
          customerName: customerName.trim() || undefined,
          notes: notes.trim() || undefined,
          items,
        }),
      });
      const json = await response.json().catch(() => ({}));
      const message = Array.isArray(json.message)
        ? json.message.join(", ")
        : json.message || json.error;
      if (!response.ok) {
        throw new Error(message || "Failed to submit order request");
      }
      clearCart();
      setNotes("");
      setSuccessMessage(
        `Order sent to the waiter for table ${table.tableNumber}. It will be confirmed after approval.`,
      );
      return true;
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to submit order request");
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [cart, clearCart, customerName, notes, table]);

  const value = useMemo(
    () => ({
      isSelfOrder: Boolean(table),
      table,
      customerName,
      setCustomerName,
      notes,
      setNotes,
      submitting,
      successMessage,
      errorMessage,
      registerTable,
      submitOrder,
    }),
    [customerName, errorMessage, notes, registerTable, submitOrder, submitting, successMessage, table],
  );

  return <SelfOrderContext.Provider value={value}>{children}</SelfOrderContext.Provider>;
}

export function useSelfOrder() {
  const context = useContext(SelfOrderContext);
  if (!context) {
    throw new Error("useSelfOrder must be used within a SelfOrderProvider");
  }
  return context;
}
