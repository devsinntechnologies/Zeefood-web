"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getMockSession } from "@/data/mock-qr-sessions";
import { getMockMenu } from "@/data/mock-menu";
import { createMenuPages } from "@/utils/create-menu-pages";
import type { MenuItem } from "@/types/qr-menu.types";
import { QRCartProvider, useQRCart } from "@/components/qr-menu/QRCartContext";
import QRMenuHeader from "@/components/qr-menu/QRMenuHeader";
import MenuBook from "@/components/qr-menu/MenuBook";
import MenuItemSheet from "@/components/qr-menu/MenuItemSheet";
import FloatingOrderBar from "@/components/qr-menu/FloatingOrderBar";
import OrderReview from "@/components/qr-menu/OrderReview";
import MockOrderSuccess from "@/components/qr-menu/MockOrderSuccess";

function QRMenuExperience({ tableNumber }: { tableNumber: string }) {
  const pages = useMemo(() => createMenuPages(getMockMenu()), []);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const { clearCart } = useQRCart();

  const handleConfirm = () => {
    setIsReviewOpen(false);
    setIsSuccessOpen(true);
  };

  const handleBackToMenu = () => {
    setIsSuccessOpen(false);
    clearCart();
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#fbf7f2]">
      <QRMenuHeader tableNumber={tableNumber} onOpenOrder={() => setIsReviewOpen(true)} />

      <main className="flex flex-1 flex-col justify-center overflow-y-auto px-4 py-5 pb-28 sm:py-8 sm:pb-28">
        <MenuBook pages={pages} onOpenItem={setActiveItem} />
      </main>

      <FloatingOrderBar onView={() => setIsReviewOpen(true)} />

      <MenuItemSheet item={activeItem} onClose={() => setActiveItem(null)} />

      <OrderReview
        isOpen={isReviewOpen}
        tableNumber={tableNumber}
        onClose={() => setIsReviewOpen(false)}
        onConfirm={handleConfirm}
      />

      <MockOrderSuccess
        isOpen={isSuccessOpen}
        tableNumber={tableNumber}
        onBackToMenu={handleBackToMenu}
      />
    </div>
  );
}

function InvalidQRState() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#fbf7f2] px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-primary/15 bg-white shadow-sm">
        <svg className="h-7 w-7 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
        </svg>
      </div>
      <h1 className="mt-5 text-xl font-black uppercase tracking-tight text-brand-dark">
        Invalid or Expired QR Code
      </h1>
      <p className="mt-2 max-w-xs text-sm font-medium leading-relaxed text-brand-dark/55">
        This table link could not be verified. Please ask a staff member to rescan your table&apos;s QR code.
      </p>
    </div>
  );
}

export default function QRMenuPage() {
  const params = useParams<{ token: string }>();
  const token = params?.token;
  const session = token ? getMockSession(token) : null;

  if (!session) {
    return <InvalidQRState />;
  }

  return (
    <QRCartProvider>
      <QRMenuExperience tableNumber={session.tableNumber} />
    </QRCartProvider>
  );
}
