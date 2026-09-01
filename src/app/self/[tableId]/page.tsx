import { Suspense } from "react";
import SelfOrderPage from "@/components/self-order/SelfOrderPage";

export const metadata = {
  title: "Table Order — ZeeFood Premium",
  description: "Scan, browse the menu, and send a table order for waiter approval.",
};

export default function SelfOrderRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fbf7f2]" />}>
      <SelfOrderPage />
    </Suspense>
  );
}
