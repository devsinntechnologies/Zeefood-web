"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Category = {
  id: string;
  name: string;
  nameUr?: string;
};

type RemoteProduct = {
  category?: {
    id?: string;
    CategoryName?: string;
    CategoryNameUr?: string;
  };
};

const FEATURED_CATEGORIES = [
  { id: "mashrobat", name: "Mashrobat", label: "مشروبات", image: "/drinks_compressed.webp" },
  { id: "azafi-ashia", name: "Azafi Ashia", label: "اضافی اشیاء", image: "/extra_items_compressed.webp" },
  { id: "frozen", name: "Frozen", label: "فروزن", image: "/frozen_compressed.webp" },
  { id: "desi", name: "Desi", label: "دیسی", image: "/desi_compressed.webp" },
  { id: "achar", name: "Achar", label: "اچار", image: "/achar_compressed.webp" },
  { id: "chat", name: "Chat", label: "چاٹ", image: "/chaat_compressed.webp" },
];

export default function ExploreMenu() {
  const { language } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSliding, setIsSliding] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const slideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollCategories = useCallback((direction: "left" | "right") => {
    const container = categoryScrollRef.current;
    if (!container) return;
    const firstCard = container.querySelector<HTMLAnchorElement>("a");
    const gap = 10;
    const distance = firstCard ? firstCard.clientWidth + gap : container.clientWidth / 4;

    if (slideTimerRef.current) {
      clearTimeout(slideTimerRef.current);
    }

    setIsSliding(true);
    container.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });

    slideTimerRef.current = setTimeout(() => {
      setIsSliding(false);
    }, 520);
  }, []);

  useEffect(() => {
    return () => {
      if (slideTimerRef.current) {
        clearTimeout(slideTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/products?page=1&limit=100");
        if (!res.ok) {
          throw new Error(`Products API error: ${res.status}`);
        }

        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const catMap = new Map<string, Category>();
          json.data.forEach((item: RemoteProduct) => {
            const cat = item.category;
            if (cat?.id && cat.CategoryName && !catMap.has(cat.id)) {
              catMap.set(cat.id, { id: cat.id, name: cat.CategoryName, nameUr: cat.CategoryNameUr || undefined });
            }
          });
          setCategories(Array.from(catMap.values()));
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const visibleCategories = FEATURED_CATEGORIES.map((featured) => {
    const remoteCategory = categories.find((cat) => {
      const categoryName = cat.name.toLowerCase();
      return categoryName === featured.name.toLowerCase() || categoryName === featured.label.toLowerCase();
    });

    return {
      ...featured,
      hrefName: remoteCategory?.name || featured.name,
      nameUr: remoteCategory?.nameUr,
    };
  });

  return (
    <section className="w-full bg-[#F2F3F3] pb-4 pt-2 sm:pb-5 sm:pt-3 lg:pb-6 lg:pt-3 2xl:pb-7 2xl:pt-4">
      <div className="site-container">
        <div className="mb-3 grid grid-cols-1 items-end gap-2 py-0 sm:mb-4 sm:grid-cols-[1fr_auto_1fr] 2xl:mb-5">
          <div className="hidden sm:block" />

          <div className="flex flex-col items-center text-center">
            <h2 className="font-sans text-3xl font-black uppercase leading-none tracking-tighter text-brand-primary lg:text-5xl">
              CATEGORIES
            </h2>
            <p lang="ur" dir="rtl" className="-mt-1 font-ama-dhaba text-4xl font-black leading-none text-brand-primary lg:-mt-2 lg:text-6xl">
              اقسام
            </p>
            <div className="mt-1 h-1.5 w-20 rounded-full bg-brand-primary" />
          </div>

          <div className="flex flex-col items-center sm:items-end">
            <Link
              href="/menu"
              className="text-sm font-bold uppercase tracking-widest text-brand-dark transition-colors hover:text-brand-primary"
            >
              {language === "UR" ? "تمام مینو" : "VIEW ALL"}
            </Link>
            <div className="mt-1.5 h-[2px] w-14 rounded-full bg-brand-primary" />
          </div>
        </div>

        <div className="relative sm:px-5 md:px-6">
          <button
            type="button"
            onClick={() => scrollCategories("left")}
            className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-primary/20 bg-white text-brand-primary shadow-sm transition-all duration-300 hover:bg-brand-primary hover:text-white hover:shadow-lg active:scale-95 sm:flex md:h-11 md:w-11 md:-translate-x-1/2"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>

          <div
            ref={categoryScrollRef}
            className="grid auto-cols-[100%] grid-flow-col gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth snap-x snap-proximity sm:auto-cols-[calc((100%-0.75rem)/2)] lg:auto-cols-[calc((100%-2.25rem)/4)] 2xl:auto-cols-[calc((100%-3rem)/5)] 2xl:gap-3 [@media(min-width:2200px)]:auto-cols-[calc((100%-3.75rem)/6)]"
          >
            {visibleCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/menu?category=${encodeURIComponent(cat.hrefName)}`}
                className={`group relative flex h-[170px] cursor-pointer snap-start flex-col justify-end overflow-hidden rounded-[18px] border border-brand-primary/10 bg-white p-4 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand-primary/25 hover:shadow-[0_14px_28px_rgba(17,24,39,0.10)] sm:h-[200px] sm:p-4 lg:h-[210px] 2xl:h-[240px] 2xl:p-5 [@media(min-width:2200px)]:h-[280px] ${isSliding ? "translate-y-1 scale-[0.985] opacity-90" : "translate-y-0 scale-100 opacity-100"}`}
                style={{
                  backgroundImage: `url(${cat.image})`,
                  backgroundPosition: "center 20%",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                <div className="relative flex flex-col items-start text-left">
                  <h3 lang="ur" dir="rtl" className="font-ama-dhaba text-4xl font-black leading-tight text-white transition-colors duration-300 2xl:text-5xl">
                    {cat.label}
                  </h3>
                  <div className="mt-2 h-1.5 w-14 rounded-full bg-brand-primary transition-all duration-300 group-hover:w-24" />
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollCategories("right")}
            className="absolute right-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-primary/20 bg-white text-brand-primary shadow-sm transition-all duration-300 hover:bg-brand-primary hover:text-white hover:shadow-lg active:scale-95 sm:flex md:h-11 md:w-11 md:translate-x-1/2"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => scrollCategories("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/20 bg-white text-brand-primary shadow-sm transition-all duration-300 active:scale-95"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => scrollCategories("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/20 bg-white text-brand-primary shadow-sm transition-all duration-300 active:scale-95"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
