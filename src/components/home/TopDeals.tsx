"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const topSlides = [
  {
    image: "/20260508-164223.png",
    eyebrow: "Golden starter plate",
    title: "Samosay With Fresh Garnish",
    text: "A clean plate of golden samosay sits over crisp lettuce with lemon and mint, giving the dish a fresh, inviting finish. The flaky pastry brings a gentle crunch, while the warm spiced filling adds the familiar comfort of a classic desi starter. It feels light enough for snacking, but special enough to open a full family meal.",
  },
  {
    image: "/Gemini_Generated_Image_jgrjwfjgrjwfjgrj-removebg-preview-clean.png",
    eyebrow: "Slow-built richness",
    title: "Koftay",
    text: "Tender koftay are framed by a glossy masala finish and warm spice aroma, capturing the deep, slow-cooked character of a polished desi main. The rounded pieces soak up the gravy beautifully, giving every bite a rich texture and satisfying flavor. It is generous, balanced, and quietly luxurious without feeling overdone.",
  },
];

const bottomSlides = [
  {
    image: "/Gemini_Generated_Image_lubib9lubib9lubi-removebg-preview-clean.png",
    eyebrow: "Street-side character",
    title: "Chutney & Crunch",
    text: "This plate carries the lively side of desi khana with fresh herbs, bright chutney, and a crisp finish that brings energy to the table. The fresh vegetables and tangy notes create a refreshing contrast against heavier meals, making it perfect as a side, snack, or quick flavor boost. It is simple, colorful, and full of everyday charm.",
  },
  {
    image: "/20260508-164046-clean.png",
    eyebrow: "Home-cooked comfort",
    title: "Rice, Gravy & Heritage",
    text: "A comforting plate of fragrant rice and rich gravy speaks to the slower rhythm of home-style cooking. The soft rice carries the sauce well, while the warm masala gives the dish a grounded, familiar depth. It is the kind of plate that feels generous, satisfying, and deeply rooted in everyday desi tradition.",
  },
];

export default function TopDeals() {
  const { language } = useLanguage();
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  useEffect(() => {
    const topTimer = window.setInterval(() => {
      setTopIndex((index) => (index + 1) % topSlides.length);
    }, 3200);

    const bottomTimer = window.setInterval(() => {
      setBottomIndex((index) => (index + 1) % bottomSlides.length);
    }, 3600);

    return () => {
      window.clearInterval(topTimer);
      window.clearInterval(bottomTimer);
    };
  }, []);

  return (
    <section className="relative z-10 w-full overflow-hidden bg-[#F2F3F3] pb-5 pt-3 sm:pb-6 sm:pt-4 lg:pb-8 lg:pt-4">
      <div className="site-container relative z-20">
        <div className="mb-2 flex flex-col items-center text-center sm:mb-3 lg:mb-4">
          <h2 className="text-[clamp(1.7rem,8vw,2.5rem)] font-black uppercase leading-[0.95] tracking-tighter text-brand-primary lg:text-4xl">
            {language === "UR" ? "طریقہ پکانے" : "Way of Cooking"}
          </h2>
          <h3 lang="ur" dir="rtl" className="-mt-1 font-ama-dhaba text-[clamp(2.4rem,11vw,3.7rem)] font-black leading-none text-brand-primary lg:text-5xl">
            دیسی کھانے کی کہانی
          </h3>
          <p className="mt-0.5 max-w-2xl text-sm font-medium leading-6 text-brand-dark/65">
            A carefully composed look at the dishes that shape everyday desi dining, from crisp starters to comfort-rich mains.
          </p>
          <div className="mt-1 h-1.5 w-14 rounded-full bg-brand-primary" />
        </div>

        <div className="space-y-2 lg:space-y-3 2xl:space-y-5">
          <StorySlider slide={topSlides[topIndex]} />
          <StorySlider slide={bottomSlides[bottomIndex]} reverse />
        </div>
      </div>
    </section>
  );
}

function StorySlider({
  slide,
  reverse = false,
}: {
  slide: {
    image: string;
    eyebrow: string;
    title: string;
    text: string;
  };
  reverse?: boolean;
}) {
  return (
    <div className={`grid grid-cols-1 items-center gap-3 lg:grid-cols-2 lg:gap-7 2xl:gap-10 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div className="flex justify-center">
        <div className="relative flex w-full max-w-[680px] flex-col items-center overflow-visible bg-transparent">
          <div className="relative h-[220px] w-full overflow-visible bg-transparent sm:h-[290px] lg:h-[340px] 2xl:h-[420px] [@media(min-width:2200px)]:h-[520px]">
            <Image
              key={slide.image}
              src={slide.image}
              alt={slide.title}
              fill
              className="scale-[1.02] object-contain object-center drop-shadow-[0_18px_30px_rgba(17,24,39,0.14)] animate-in fade-in zoom-in-95 duration-700"
              sizes="(max-width: 1024px) 92vw, 700px"
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-2xl lg:text-left 2xl:max-w-3xl">
        <div className="border-l-0 border-brand-primary/30 lg:border-l-4 lg:pl-6">
          <p key={slide.eyebrow} className="text-xs font-black uppercase tracking-[0.24em] text-brand-primary animate-in fade-in slide-in-from-bottom-2 duration-500">
            {slide.eyebrow}
          </p>
          <h4 key={slide.title} className="mt-2 text-2xl font-black uppercase leading-tight text-brand-dark animate-in fade-in slide-in-from-bottom-2 duration-500 lg:text-3xl 2xl:text-4xl">
            {slide.title}
          </h4>
          <p key={slide.text} className="mt-3 text-sm font-medium leading-7 text-brand-dark/70 animate-in fade-in slide-in-from-bottom-2 duration-500 lg:text-base lg:leading-8 2xl:text-lg 2xl:leading-9">
            {slide.text}
          </p>
        </div>
      </div>
    </div>
  );
}
