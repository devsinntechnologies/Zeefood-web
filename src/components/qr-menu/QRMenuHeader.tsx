"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useQRCart } from "./QRCartContext";

export default function QRMenuHeader({
  tableNumber,
  onOpenOrder,
}: {
  tableNumber: string;
  onOpenOrder: () => void;
}) {
  const { cartCount } = useQRCart();

  return (
    <header className="relative z-10 shrink-0 border-b border-brand-primary/10">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="relative h-14 w-[7.25rem] shrink-0 sm:h-16 sm:w-36">
            <Image src="/logo2.png" alt="ZeeFood Gallery" fill className="object-contain object-left drop-shadow-[0_3px_10px_rgba(17,17,17,0.1)]" unoptimized />
          </div>
          <div className="min-w-0">
            <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-widest text-brand-dark/45">
              Dine-In Menu &bull; Table {tableNumber}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenOrder}
          className="relative flex shrink-0 items-center gap-1.5 rounded-full border border-brand-primary/20 bg-[#F2F3F3] px-3 py-2 text-brand-primary transition-colors hover:bg-brand-primary/10"
          aria-label="View order"
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={2.5} />
          <span className="text-[11px] font-black uppercase tracking-wider">Cart</span>
          {cartCount > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-black text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
