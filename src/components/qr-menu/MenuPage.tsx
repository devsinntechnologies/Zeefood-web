"use client";

import type { MenuItem as MenuItemType, MenuPageData } from "@/types/qr-menu.types";
import MenuItem from "./MenuItem";

export default function MenuPage({
  page,
  totalPages,
  onOpenItem,
}: {
  page: MenuPageData;
  totalPages: number;
  onOpenItem: (item: MenuItemType) => void;
}) {
  return (
    <div className="flex h-full w-full flex-col rounded-[28px] border border-brand-primary/10 bg-white p-5 shadow-[0_20px_50px_rgba(17,24,39,0.08)] ring-1 ring-black/[0.02] sm:p-6">
      <div className="shrink-0 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary/70">
          Zee Food Gallery
        </p>
        <h2 className="mt-1 text-xl font-black uppercase leading-tight tracking-tight text-brand-dark sm:text-2xl">
          {page.categoryName}
        </h2>
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-brand-primary" />
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto no-scrollbar">
        {page.items.map((item) => (
          <MenuItem key={item.id} item={item} onOpen={onOpenItem} />
        ))}
      </div>

      <div className="mt-2 shrink-0 border-t border-gray-100 pt-3 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-dark/35">
          Page {page.pageNumber} / {totalPages}
        </span>
      </div>
    </div>
  );
}
