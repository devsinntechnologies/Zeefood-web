"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

export default function MockOrderSuccess({
  isOpen,
  tableNumber,
  onBackToMenu,
}: {
  isOpen: boolean;
  tableNumber: string;
  onBackToMenu: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"loading" | "success">("loading");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    setPhase("loading");
    const timer = setTimeout(() => setPhase("success"), 1100);
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="qr-mock-success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#fbf7f2] px-6"
        >
          <div className="flex w-full max-w-sm flex-col items-center text-center">
            {phase === "loading" ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-primary/20 bg-white shadow-sm">
                  <Loader2 className="h-7 w-7 animate-spin text-brand-primary" strokeWidth={2.5} />
                </div>
                <p className="mt-5 text-sm font-black uppercase tracking-widest text-brand-dark/60">
                  Confirming your selection&hellip;
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col items-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary shadow-[0_16px_36px_rgba(248,114,5,0.35)]">
                  <Check className="h-9 w-9 text-white" strokeWidth={3} />
                </div>
                <h2 className="mt-6 text-2xl font-black uppercase leading-tight tracking-tight text-brand-dark">
                  Order Selection Confirmed
                </h2>
                <p className="mt-1.5 text-sm font-bold uppercase tracking-widest text-brand-primary">
                  Table {tableNumber}
                </p>
                <p className="mt-4 max-w-xs text-xs font-medium italic leading-relaxed text-brand-dark/45">
                  This is currently a frontend preview.
                </p>
                <button
                  type="button"
                  onClick={onBackToMenu}
                  className="mt-8 rounded-full border-2 border-brand-primary/25 bg-white px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-brand-dark transition-all hover:border-brand-primary hover:text-brand-primary"
                >
                  Back to Menu
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
