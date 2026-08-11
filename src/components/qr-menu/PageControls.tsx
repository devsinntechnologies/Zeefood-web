"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PageControls({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-4 flex shrink-0 items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrev}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-primary/20 bg-white text-brand-primary shadow-sm transition-all duration-300 hover:bg-brand-primary hover:text-white disabled:pointer-events-none disabled:opacity-25"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
      </button>

      <span className="min-w-[3.5rem] text-center text-[11px] font-black uppercase tracking-widest text-brand-dark/50 tabular-nums">
        {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-primary/20 bg-white text-brand-primary shadow-sm transition-all duration-300 hover:bg-brand-primary hover:text-white disabled:pointer-events-none disabled:opacity-25"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
