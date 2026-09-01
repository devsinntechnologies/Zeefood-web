"use client";

import Image from "next/image";
import type { MenuItem as MenuItemType } from "@/types/qr-menu.types";
import { useQRCart } from "./QRCartContext";

export default function MenuItem({
  item,
  onOpen,
}: {
  item: MenuItemType;
  onOpen: (item: MenuItemType) => void;
}) {
  const { quantityFor, updateQuantity } = useQRCart();
  const quantity = quantityFor(item.id);

  return (
    <div className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-0">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-brand-primary/10 bg-[#fbf7f2]"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
          unoptimized
        />
      </button>

      <button type="button" onClick={() => onOpen(item)} className="min-w-0 flex-1 text-left">
        <h3 className="truncate text-[13px] font-black uppercase leading-tight text-brand-dark">
          {item.name}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-snug text-brand-dark/55">
          {item.description}
        </p>
        <p className="mt-1 text-[13px] font-black text-brand-primary">Rs. {item.price}</p>
      </button>

      <div className="shrink-0">
        {quantity > 0 ? (
          <div className="flex h-8 items-center gap-1 rounded-full border border-brand-primary/25 bg-[#fbf7f2] px-1 shadow-sm">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, -1)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-brand-dark transition-colors hover:text-brand-primary"
              aria-label={`Decrease ${item.name} quantity`}
            >
              −
            </button>
            <span className="min-w-[1.1rem] text-center text-xs font-black tabular-nums text-brand-dark">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-brand-dark transition-colors hover:text-brand-primary"
              aria-label={`Increase ${item.name} quantity`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="rounded-full bg-brand-primary px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-[0_6px_14px_rgba(248,114,5,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#e96500]"
          >
            + Add
          </button>
        )}
      </div>
    </div>
  );
}
