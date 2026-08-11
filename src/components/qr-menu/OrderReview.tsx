"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useQRCart } from "./QRCartContext";

export default function OrderReview({
  isOpen,
  tableNumber,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  tableNumber: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { lines, cartTotal, updateQuantity, removeItem } = useQRCart();
  const [mounted, setMounted] = useState(false);
  const [orderNote, setOrderNote] = useState("");

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (isOpen) setOrderNote("");
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="qr-order-review-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            key="qr-order-review"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="flex max-h-[92dvh] w-full max-w-md flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-black uppercase tracking-tight text-brand-dark">
                  Your Order
                </h2>
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-widest text-brand-primary">
                  Table {tableNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fbf7f2] text-brand-dark transition-colors hover:text-brand-primary"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5 py-4 sm:px-6">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <p className="text-sm font-bold text-brand-dark/50">
                    Your order is empty. Add a dish from the menu to get started.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {lines.map((line) => (
                    <div
                      key={line.item.id}
                      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_8px_20px_rgba(17,24,39,0.04)]"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-brand-primary/10 bg-[#fbf7f2]">
                        <Image
                          src={line.item.image}
                          alt={line.item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-black uppercase text-brand-dark">
                          {line.quantity} &times; {line.item.name}
                        </p>
                        {line.note && (
                          <p className="mt-0.5 truncate text-[10px] font-medium italic text-brand-dark/45">
                            &ldquo;{line.note}&rdquo;
                          </p>
                        )}
                        <div className="mt-1.5 flex items-center gap-1 rounded-full border border-brand-primary/20 bg-[#fbf7f2] px-1 py-0.5 w-fit">
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.item.id, -1)}
                            className="flex h-5 w-5 items-center justify-center rounded-full text-brand-dark hover:text-brand-primary"
                            aria-label={`Decrease ${line.item.name} quantity`}
                          >
                            −
                          </button>
                          <span className="min-w-[1rem] text-center text-[10px] font-black text-brand-dark">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.item.id, 1)}
                            className="flex h-5 w-5 items-center justify-center rounded-full text-brand-dark hover:text-brand-primary"
                            aria-label={`Increase ${line.item.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <span className="text-[12px] font-black text-brand-primary">
                          Rs. {line.item.price * line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(line.item.id)}
                          aria-label={`Remove ${line.item.name}`}
                          className="text-brand-dark/30 transition-colors hover:text-brand-primary"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {lines.length > 0 && (
                <div className="mt-5">
                  <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-brand-dark/50">
                    Order Note
                  </p>
                  <textarea
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="e.g. Please bring raita separately"
                    rows={2}
                    className="w-full resize-none rounded-[14px] border border-gray-200 bg-[#fbf7f2] px-3.5 py-2.5 text-xs font-medium text-brand-dark placeholder:text-brand-dark/35 outline-none transition-all focus:border-brand-primary/40 focus:ring-2 focus:ring-brand-primary/10"
                  />
                </div>
              )}
            </div>

            {lines.length > 0 && (
              <div className="shrink-0 border-t border-gray-100 px-5 py-4 sm:px-6">
                <div className="mb-3 flex items-center justify-between text-sm font-bold text-brand-dark">
                  <span className="text-brand-dark/60">Subtotal</span>
                  <span className="font-black">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="flex w-full items-center justify-between rounded-full bg-brand-primary px-6 py-3.5 text-white shadow-[0_10px_24px_rgba(248,114,5,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e96500]"
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                    Confirm Order
                  </span>
                  <span className="text-sm font-black">Rs. {cartTotal.toLocaleString()}</span>
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
