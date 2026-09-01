"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SearchX } from "lucide-react";
import { getMockSession } from "@/data/mock-qr-sessions";
import { getMockMenu } from "@/data/mock-menu";
import type { MenuItem } from "@/types/qr-menu.types";
import { QRCartProvider, useQRCart } from "@/components/qr-menu/QRCartContext";
import QRMenuHeader from "@/components/qr-menu/QRMenuHeader";
import MenuSearch from "@/components/qr-menu/MenuSearch";
import CategoryTabs from "@/components/qr-menu/CategoryTabs";
import MenuSection from "@/components/qr-menu/MenuSection";
import MenuItemSheet from "@/components/qr-menu/MenuItemSheet";
import FloatingOrderBar from "@/components/qr-menu/FloatingOrderBar";
import OrderReview from "@/components/qr-menu/OrderReview";
import MockOrderSuccess from "@/components/qr-menu/MockOrderSuccess";

// Extra breathing room below the sticky header/search/tabs stack when
// jumping to or spying on a category section.
const SCROLL_SPY_PADDING = 12;

function QRMenuExperience({ tableNumber }: { tableNumber: string }) {
  const categories = useMemo(() => getMockMenu(), []);
  const [query, setQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? "");
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const { clearCart } = useQRCart();

  const mainRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sectionEls = useRef<Record<string, HTMLElement | null>>({});
  const [stickyHeight, setStickyHeight] = useState(0);

  const isSearching = query.trim().length > 0;

  const filteredCategories = useMemo(() => {
    if (!isSearching) return categories;
    const q = query.trim().toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, isSearching, query]);

  // Keep the sticky header/search/tabs stack height in sync so section
  // scroll offsets and the scroll-spy band stay accurate even if the
  // header wraps (e.g. a long table number) or the viewport resizes.
  useEffect(() => {
    const measure = () => setStickyHeight(stickyRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll-spy: highlight whichever category tab matches the section
  // currently at the top of the scroll container. Skipped while searching,
  // since the tabs are hidden in that state.
  useEffect(() => {
    if (isSearching) return;
    const container = mainRef.current;
    if (!container || stickyHeight === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        const id = topMost.target.getAttribute("data-category-id");
        if (id) setActiveCategoryId(id);
      },
      {
        root: container,
        rootMargin: `-${stickyHeight + SCROLL_SPY_PADDING}px 0px -65% 0px`,
        threshold: 0,
      }
    );

    Object.values(sectionEls.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isSearching, stickyHeight, filteredCategories]);

  const handleSelectCategory = (id: string) => {
    setActiveCategoryId(id);
    sectionEls.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleConfirm = () => {
    setIsReviewOpen(false);
    setIsSuccessOpen(true);
  };

  const handleBackToMenu = () => {
    setIsSuccessOpen(false);
    clearCart();
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-[#fbf7f2]">
      <div ref={stickyRef} className="sticky top-0 z-30 shrink-0">
        <QRMenuHeader tableNumber={tableNumber} onOpenOrder={() => setIsReviewOpen(true)} />
        <div className="border-b border-brand-primary/10 bg-[#fbf7f2]/95 backdrop-blur-sm">
          <MenuSearch value={query} onChange={setQuery} />
          <CategoryTabs
            categories={categories}
            activeId={activeCategoryId}
            disabled={isSearching}
            onSelect={handleSelectCategory}
          />
        </div>
      </div>

      <main ref={mainRef} className="min-h-0 flex-1 overflow-y-auto px-4 pb-28 sm:px-5">
        <div className="mx-auto w-full max-w-[440px]">
          {filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-primary/15 bg-white shadow-sm">
                <SearchX className="h-6 w-6 text-brand-primary" strokeWidth={2} />
              </div>
              <p className="mt-4 text-sm font-bold text-brand-dark/50">
                No dishes match &ldquo;{query.trim()}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-4 rounded-full border border-brand-primary/20 bg-white px-5 py-2 text-[11px] font-black uppercase tracking-widest text-brand-primary transition-colors hover:bg-brand-primary/5"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <MenuSection
                key={category.id}
                category={category}
                scrollMarginTop={stickyHeight + SCROLL_SPY_PADDING}
                sectionRef={(el) => {
                  sectionEls.current[category.id] = el;
                }}
                onOpenItem={setActiveItem}
              />
            ))
          )}
        </div>
      </main>

      <FloatingOrderBar onView={() => setIsReviewOpen(true)} />

      <MenuItemSheet item={activeItem} onClose={() => setActiveItem(null)} />

      <OrderReview
        isOpen={isReviewOpen}
        tableNumber={tableNumber}
        onClose={() => setIsReviewOpen(false)}
        onConfirm={handleConfirm}
      />

      <MockOrderSuccess
        isOpen={isSuccessOpen}
        tableNumber={tableNumber}
        onBackToMenu={handleBackToMenu}
      />
    </div>
  );
}

function InvalidQRState() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#fbf7f2] px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-primary/15 bg-white shadow-sm">
        <svg className="h-7 w-7 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
        </svg>
      </div>
      <h1 className="mt-5 text-xl font-black uppercase tracking-tight text-brand-dark">
        Invalid or Expired QR Code
      </h1>
      <p className="mt-2 max-w-xs text-sm font-medium leading-relaxed text-brand-dark/55">
        This table link could not be verified. Please ask a staff member to rescan your table&apos;s QR code.
      </p>
    </div>
  );
}

export default function QRMenuRoute({ token }: { token: string }) {
  const session = token ? getMockSession(token) : null;

  if (!session) {
    return <InvalidQRState />;
  }

  return (
    <QRCartProvider>
      <QRMenuExperience tableNumber={session.tableNumber} />
    </QRCartProvider>
  );
}
