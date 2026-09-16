import { Suspense } from "react";
import OrderPage from "@/components/order/OrderPage";

export const metadata = {
  title: "Menu — ZeeFood Premium",
};

export default function MenuPage() {
  // We reuse the highly premium OrderPage for the /menu route.
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2F3F3]" />}>
      <OrderPage />
    </Suspense>
  );
}
