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
    <header className="relative z-10 shrink-0 border-b border-brand-primary/10 bg-white/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-brand-primary/15">
            <Image src="/logo.png" alt="" fill className="object-cover" unoptimized />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-black uppercase leading-none tracking-tight text-brand-dark sm:text-base">
              Zee Food Gallery
            </h1>
            <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-widest text-brand-dark/45">
              Dine-In Menu &bull; Table {tableNumber}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenOrder}
          className="relative flex shrink-0 items-center gap-1.5 rounded-full border border-brand-primary/20 bg-[#fbf7f2] px-3 py-2 text-brand-primary transition-colors hover:bg-brand-primary/10"
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
