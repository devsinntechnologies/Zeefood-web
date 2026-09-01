"use client";

import { useMemo, useState } from "react";
import { getMockSession } from "@/data/mock-qr-sessions";
import { getMockMenu } from "@/data/mock-menu";
import { QRCartProvider, useQRCart } from "@/components/qr-menu/QRCartContext";
import QRMenuLayout from "@/components/qr-menu/QRMenuLayout";
import MockOrderSuccess from "@/components/qr-menu/MockOrderSuccess";

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

function MockQRMenuExperience({ tableNumber }: { tableNumber: string }) {
  const categories = useMemo(() => getMockMenu(), []);
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
    <>
      <QRMenuLayout
        tableNumber={tableNumber}
        categories={categories}
        isReviewOpen={isReviewOpen}
        onOpenReview={() => setIsReviewOpen(true)}
        onCloseReview={() => setIsReviewOpen(false)}
        onConfirmOrder={handleConfirm}
      />
      <MockOrderSuccess
        isOpen={isSuccessOpen}
        tableNumber={tableNumber}
        onBackToMenu={handleBackToMenu}
      />
    </>
  );
}

export default function QRMenuRoute({ token }: { token: string }) {
  const session = token ? getMockSession(token) : null;

  if (!session) {
    return <InvalidQRState />;
  }

  return (
    <QRCartProvider>
      <MockQRMenuExperience tableNumber={session.tableNumber} />
    </QRCartProvider>
  );
}
