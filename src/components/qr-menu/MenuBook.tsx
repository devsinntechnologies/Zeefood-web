"use client";

import { useState } from "react";
import { AnimatePresence, motion, type PanInfo, type Variants } from "framer-motion";
import type { MenuItem as MenuItemType, MenuPageData } from "@/types/qr-menu.types";
import MenuPage from "./MenuPage";
import PageControls from "./PageControls";

const SWIPE_THRESHOLD = 60;

const pageVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 36 : -36,
    opacity: 0,
    rotateY: direction > 0 ? 8 : -8,
  }),
  center: { x: 0, opacity: 1, rotateY: 0 },
  exit: (direction: number) => ({
    x: direction > 0 ? -36 : 36,
    opacity: 0,
    rotateY: direction > 0 ? -8 : 8,
  }),
};

export default function MenuBook({
  pages,
  onOpenItem,
}: {
  pages: MenuPageData[];
  onOpenItem: (item: MenuItemType) => void;
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (delta: number) => {
    setPageIndex((prev) => {
      const next = prev + delta;
      if (next < 0 || next >= pages.length) return prev;
      setDirection(delta);
      return next;
    });
  };

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      paginate(1);
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      paginate(-1);
    }
  };

  const currentPage = pages[pageIndex];
  if (!currentPage) return null;

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <div
        className="relative w-full"
        style={{ height: "clamp(420px, 60dvh, 620px)", perspective: 1400 }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={pageIndex}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            drag="x"
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ transformStyle: "preserve-3d" }}
          >
            <MenuPage page={currentPage} totalPages={pages.length} onOpenItem={onOpenItem} />
          </motion.div>
        </AnimatePresence>
      </div>

      <PageControls
        currentPage={pageIndex + 1}
        totalPages={pages.length}
        onPrev={() => paginate(-1)}
        onNext={() => paginate(1)}
      />
    </div>
  );
}
