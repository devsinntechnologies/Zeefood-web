"use client";

import { useEffect, useRef } from "react";

export default function CategoryTabs({
  categories,
  activeId,
  disabled,
  onSelect,
}: {
  categories: { id: string; name: string }[];
  activeId: string;
  disabled?: boolean;
  onSelect: (id: string) => void;
}) {
  const tabEls = useRef<Record<string, HTMLButtonElement | null>>({});

  // Keep the active pill in view when it changes from scroll-spy (not just
  // a direct tap), otherwise the highlighted category can scroll off the
  // edge of this horizontally-scrollable strip while the user browses.
  useEffect(() => {
    tabEls.current[activeId]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [activeId]);

  return (
    <div
      className={`flex gap-2 overflow-x-auto no-scrollbar px-4 py-2.5 transition-opacity duration-200 sm:px-5 ${
        disabled ? "pointer-events-none opacity-40" : ""
      }`}
    >
      {categories.map((category) => {
        const isActive = category.id === activeId;
        return (
          <button
            key={category.id}
            ref={(el) => {
              tabEls.current[category.id] = el;
            }}
            type="button"
            onClick={() => onSelect(category.id)}
            className={`flex-none whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
              isActive
                ? "bg-brand-primary text-white shadow-[0_6px_14px_rgba(248,114,5,0.28)]"
                : "border border-brand-primary/15 bg-white text-brand-dark/60 hover:border-brand-primary/30 hover:text-brand-primary"
            }`}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
