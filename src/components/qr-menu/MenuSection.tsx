"use client";

import type { MenuCategory, MenuItem as MenuItemType } from "@/types/qr-menu.types";
import MenuItem from "./MenuItem";

export default function MenuSection({
  category,
  scrollMarginTop,
  sectionRef,
  onOpenItem,
}: {
  category: MenuCategory;
  scrollMarginTop: number;
  sectionRef: (el: HTMLElement | null) => void;
  onOpenItem: (item: MenuItemType) => void;
}) {
  return (
    <section
      ref={sectionRef}
      data-category-id={category.id}
      style={{ scrollMarginTop }}
      className="pt-6 first:pt-4"
    >
      <div className="mb-2 flex items-center gap-2.5">
        <h2 className="shrink-0 text-lg font-black uppercase tracking-tight text-brand-dark sm:text-xl">
          {category.name}
        </h2>
        <span className="h-px flex-1 bg-brand-primary/10" />
      </div>
      <div className="rounded-[20px] border border-brand-primary/10 bg-white px-4 shadow-[0_10px_28px_rgba(17,24,39,0.05)] sm:px-5">
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} onOpen={onOpenItem} />
        ))}
      </div>
    </section>
  );
}
