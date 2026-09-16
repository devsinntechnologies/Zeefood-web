"use client";

import { AnimatePresence, LazyMotion, domAnimation, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          className="relative min-h-full overflow-hidden"
          initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(5px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[90] bg-gradient-to-r from-[#E71C07]/90 via-transparent to-[#FB5C02]/80"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "-100%", opacity: 0 }}
            exit={{ x: ["-100%", "10%", "120%"], opacity: [0, 0.56, 0] }}
            transition={{ duration: 0.58, times: [0, 0.32, 1], ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 bg-brand-primary shadow-[0_0_40px_rgba(231, 28, 7,0.35)]"
            initial={{ x: "-120%", opacity: 0 }}
            animate={{ x: "-120%", opacity: 0 }}
            exit={{ x: ["-120%", "20%", "120%"], opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.48, times: [0, 0.22, 1], ease: [0.76, 0, 0.24, 1] }}
          />
          {children}
        </motion.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
