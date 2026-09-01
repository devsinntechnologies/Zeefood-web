"use client";

import { Search, X } from "lucide-react";

export default function MenuSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="px-4 pt-3.5 sm:px-5 sm:pt-4">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="h-4 w-4 text-brand-primary" strokeWidth={2.5} />
        </div>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search dishes..."
          className="h-10 w-full rounded-full border border-brand-primary/20 bg-white py-2 pl-11 pr-10 text-xs font-bold text-brand-dark shadow-sm outline-none transition-all duration-300 placeholder:text-brand-dark/40 focus:border-brand-primary/40 focus:ring-4 focus:ring-brand-primary/10 sm:h-11 sm:text-sm"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-brand-dark/35 transition-colors hover:text-brand-primary"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}
