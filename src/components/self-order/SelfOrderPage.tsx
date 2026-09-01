"use client";

import { useEffect, useState } from "react";
import OrderPage from "@/components/order/OrderPage";
import { useSelfOrder } from "@/context/SelfOrderContext";
import { BUSINESS_ID } from "@/lib/api";

type TablePayload = {
  tableId?: string;
  tableNumber?: string;
  businessId?: string;
  businessName?: string | null;
  message?: string;
  data?: {
    tableId?: string;
    tableNumber?: string;
    businessId?: string;
    businessName?: string | null;
  };
};

export default function SelfOrderPage({ tableId }: { tableId: string }) {
  const { registerTable } = useSelfOrder();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadTable() {
      setLoading(true);
      setLoadError(null);
      try {
        const response = await fetch(
          `/api/self-orders/table/${tableId}?businessId=${encodeURIComponent(BUSINESS_ID)}`,
        );
        const json: TablePayload = await response.json().catch(() => ({}));
        const payload = json.data ?? json;
        if (!response.ok || !payload.tableId) {
          throw new Error(json.message || "This table QR is invalid or unavailable.");
        }
        if (!cancelled) {
          registerTable({
            tableId: payload.tableId,
            tableNumber: payload.tableNumber || "Table",
            businessId: payload.businessId || BUSINESS_ID,
            businessName: payload.businessName,
          });
        }
      } catch (err) {
        if (!cancelled) {
          registerTable(null);
          setLoadError(err instanceof Error ? err.message : "Failed to load table");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (tableId) void loadTable();
    return () => {
      cancelled = true;
      registerTable(null);
    };
  }, [registerTable, tableId]);

  if (loading) {
    return <div className="min-h-screen bg-[#fbf7f2]" />;
  }

  if (loadError) {
    return (
      <div className="mt-20 flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <p className="text-2xl font-black text-brand-dark">Unable to open table menu</p>
        <p className="mt-2 max-w-md text-sm font-semibold text-brand-dark/60">{loadError}</p>
      </div>
    );
  }

  return <OrderPage />;
}
