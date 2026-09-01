import { Suspense } from "react";
import SelfOrderPage from "@/components/self-order/SelfOrderPage";
import QRMenuRoute from "@/components/qr-menu/QRMenuRoute";

export const metadata = {
  title: "Table Order — ZeeFood Premium",
  description: "Scan, browse the menu, and send a table order for waiter approval.",
};

// Real table QR codes (drm-admin's table-qr.ts) encode a UUID tableId.
// Anything else is treated as a QR-menu design token.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function SelfRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fbf7f2]" />}>
      {UUID_RE.test(id) ? <SelfOrderPage tableId={id} /> : <QRMenuRoute token={id} />}
    </Suspense>
  );
}
