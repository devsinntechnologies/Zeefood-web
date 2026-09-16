import { Suspense } from "react";
import OrderPage from "@/components/order/OrderPage";

export const metadata = {
  title: "Order Online — ZeeFood Premium",
  description: "Order premium delivery from ZeeFood.",
};

export default function OrderRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2F3F3]" />}>
      <OrderPage />
    </Suspense>
  );
}
