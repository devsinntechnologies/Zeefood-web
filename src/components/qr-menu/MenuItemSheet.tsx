"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { MenuItem } from "@/types/qr-menu.types";
import { useQRCart } from "./QRCartContext";

export default function MenuItemSheet({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  const { lines, addItem } = useQRCart();
  const [mounted, setMounted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!item) return;
    const existingLine = lines.find((line) => line.item.id === item.id);
    setQuantity(existingLine?.quantity ?? 1);
    setNote(existingLine?.note ?? "");
  }, [item, lines]);

  if (!mounted) return null;

  const handleAdd = () => {
    if (!item) return;
    addItem(item, quantity, note.trim() || undefined);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          key="qr-item-sheet-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            key="qr-item-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-md overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-44 w-full sm:h-52">
              <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-dark shadow-sm transition-colors hover:text-brand-primary"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            <div className="max-h-[60dvh] overflow-y-auto no-scrollbar px-5 pb-5 pt-4 sm:px-6">
              <h3 className="text-xl font-black uppercase leading-tight text-brand-dark">
                {item.name}
              </h3>
              <p className="mt-1 text-sm font-medium leading-relaxed text-brand-dark/60">
                {item.description}
              </p>
              <p className="mt-2 text-lg font-black text-brand-primary">Rs. {item.price}</p>

              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-brand-dark/50">
                  Quantity
                </p>
                <div className="flex h-11 w-fit items-center gap-1 rounded-full border border-brand-primary/25 bg-[#fbf7f2] px-2 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xl font-medium text-brand-dark transition-colors hover:text-brand-primary disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-black tabular-nums text-brand-dark">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xl font-medium text-brand-dark transition-colors hover:text-brand-primary"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-brand-dark/50">
                  Special Instructions
                </p>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Less spicy please"
                  rows={2}
                  className="w-full resize-none rounded-[14px] border border-gray-200 bg-[#fbf7f2] px-3.5 py-2.5 text-xs font-medium text-brand-dark placeholder:text-brand-dark/35 outline-none transition-all focus:border-brand-primary/40 focus:ring-2 focus:ring-brand-primary/10"
                />
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="mt-5 flex w-full items-center justify-between rounded-full bg-brand-primary px-6 py-3.5 text-white shadow-[0_10px_24px_rgba(248,114,5,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e96500]"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                  Add to Order
                </span>
                <span className="text-sm font-black">Rs. {item.price * quantity}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
