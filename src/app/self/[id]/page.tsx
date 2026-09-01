import { Suspense } from "react";
import { getMockSession } from "@/data/mock-qr-sessions";
import SelfOrderPage from "@/components/self-order/SelfOrderPage";
import QRMenuRoute from "@/components/qr-menu/QRMenuRoute";

export const metadata = {
  title: "Table Order — ZeeFood Premium",
  description: "Scan, browse the menu, and send a table order for waiter approval.",
};

export default async function SelfRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Mock QR-menu tokens are a small known set looked up in-memory; anything
  // else is treated as a real table id from the self-order backend.
  if (getMockSession(id)) {
    return <QRMenuRoute token={id} />;
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fbf7f2]" />}>
      <SelfOrderPage tableId={id} />
    </Suspense>
  );
}
