"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useQRCart } from "./QRCartContext";

export default function FloatingOrderBar({ onView }: { onView: () => void }) {
  const { cartCount, cartTotal } = useQRCart();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            type="button"
            onClick={onView}
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 48, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="pointer-events-auto flex w-full max-w-[440px] items-center justify-between rounded-2xl bg-brand-primary px-5 py-3.5 text-white shadow-[0_16px_36px_rgba(248,114,5,0.4)] transition-transform active:scale-[0.98]"
          >
            <div className="text-left">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/75">
                View Order
              </p>
              <p className="mt-0.5 text-sm font-black uppercase tracking-wide">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black">Rs. {cartTotal.toLocaleString()}</span>
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
