"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// circular bar
const heroItems = [
  {
    name: "Chicken Pulao",
    urduName: "پلاؤ",
    image: "/chickenpulao.webp",
    title: "Premium Pulao,",
    highlight: "Served Fresh",
    description: "Fragrant rice cooked with rich desi spices, tender flavor, and the comforting taste of home.",
  },
  {
    name: "Chicken Nuggets",
    urduName: "نِگٹس",
    image: "/chickennuggets.webp",
    title: "Crispy Nuggets,",
    highlight: "Made Golden",
    description: "Crunchy bites with a soft, juicy center, made for quick cravings and family snack moments.",
  },
  {
    name: "Dahi Bhallay",
    urduName: "دہی بھلے",
    image: "/dahibhallay.webp",
    title: "Dahi Bhallay,",
    highlight: "Cool & Tangy",
    description: "Soft bhallay topped with creamy yogurt, chutney, and masala for a refreshing street-style treat.",
  },
  {
    name: "Dal Rice",
    urduName: "دال چاول",
    image: "/dalrice.webp",
    title: "Dal Rice,",
    highlight: "Comfort Classic",
    description: "Slow-cooked lentils served with fluffy rice for a warm, homestyle plate full of familiar flavor.",
  },
  {
    name: "Seekh Kabab",
    urduName: "کباب",
    image: "/seekhkabab.webp",
    title: "Juicy Kabab,",
    highlight: "Grilled Perfect",
    description: "Smoky, tender kababs seasoned with classic spices and cooked for a rich, memorable bite.",
  },
  {
    name: "Spring Rolls",
    urduName: "رول",
    image: "/springrolls.webp",
    title: "Spring Rolls,",
    highlight: "Crisp & Fresh",
    description: "Golden rolls with a savory filling, served crisp for snack cravings and shared family plates.",
  },
  {
    name: "Chutni",
    urduName: "چٹنی",
    image: "/chutni.png",
    title: "Fresh Chutni,",
    highlight: "Zesty & Bright",
    description: "A smooth, tangy chutni with fresh herbs and spices that lifts every bite with clean desi flavor.",
  },
  {
    name: "Biryani",
    urduName: "بریانی",
    image: "/biryani.png",
    title: "Classic Biryani,",
    highlight: "Richly Spiced",
    description: "Layered rice and masala aroma with bold spices, tender flavor, and a festive plate feel.",
  },
  {
    name: "Gol Gappy",
    urduName: "گول گپے",
    image: "/golgappy.png",
    title: "Gol Gappy,",
    highlight: "Crisp & Tangy",
    description: "Crunchy shells with punchy pani and chatpata filling for a lively street-style snack.",
  },
  {
    name: "Samosa",
    urduName: "سموسہ",
    image: "/ssamosa.png",
    title: "Crispy Samosa,",
    highlight: "Golden & Desi",
    description: "Perfectly crisp pastry filled with spiced potatoes and peas, a beloved desi street snack.",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const rotationStep = 360 / heroItems.length;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((index) => {
        const nextIndex = (index + 1) % heroItems.length;
        setRotation(-nextIndex * rotationStep);
        return nextIndex;
      });
    }, 2000);

    return () => window.clearInterval(interval);
  }, [rotationStep]);

  const item = heroItems[currentIndex];

  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-[#FFFFFF] pb-2 pt-28 sm:pb-2 sm:pt-32 lg:pb-2">
      <div className="site-container flex min-h-0 flex-col items-center">
        <div className="flex w-full flex-1 flex-col items-center gap-1 lg:flex-row lg:gap-3 2xl:gap-5 [@media(min-width:2200px)]:gap-6">
          <div className="relative z-10 max-w-3xl space-y-1 text-center sm:space-y-2 lg:w-1/2 lg:text-left 2xl:max-w-4xl">
            <div className="inline-flex flex-col items-center lg:items-start">
              <p lang="ur" dir="rtl" className="font-ama-dhaba text-[clamp(34px,9vw,52px)] font-black leading-none text-brand-primary lg:text-[clamp(54px,4vw,70px)] [@media(min-width:2200px)]:text-[80px]">
                اماں جی کا ڈھابہ
              </p>
            </div>

            <div key={item.name} className="animate-hero-copy-fade space-y-1 sm:space-y-2">
              <h1 className="text-[clamp(2.1rem,8.5vw,3.4rem)] font-extrabold leading-[1.02] text-brand-dark lg:text-[clamp(3.3rem,4.7vw,4.8rem)] [@media(min-width:2200px)]:text-[5.5rem]">
                {item.title} <span className="text-brand-primary">{item.highlight}</span>
              </h1>

              <p className="mx-auto max-w-2xl text-sm font-semibold leading-relaxed text-brand-dark sm:text-lg lg:mx-0 2xl:max-w-3xl 2xl:text-xl [@media(min-width:2200px)]:text-2xl">
                {item.description}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex w-full justify-center lg:w-1/2 lg:justify-end">
            <CircularHeroDisplay currentIndex={currentIndex} rotation={rotation} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CircularHeroDisplay({
  currentIndex,
  rotation,
}: {
  currentIndex: number;
  rotation: number;
}) {
  const visibleItems = Array.from({ length: 6 }, (_, offset) => {
    const itemIndex = (currentIndex + offset) % heroItems.length;
    return { ...heroItems[itemIndex], itemIndex, displayIndex: offset };
  });

  return (
    // Balanced container size to fit non-overlapping images cleanly
    <div className="relative grid aspect-square w-[min(85vw,360px)] max-w-full place-items-center overflow-hidden rounded-full sm:w-[min(55vw,420px)] lg:w-[min(38vw,500px)] 2xl:w-[min(32vw,600px)] [@media(min-width:2200px)]:w-[min(28vw,680px)]">
      <div className="absolute inset-[8%] rounded-full bg-[#FFFFFF] shadow-[0_24px_52px_rgba(17,24,39,0.10)]" />
      <div className="absolute inset-[15%] rounded-full border border-brand-primary/10 bg-[#FFFFFF]" />
      <div className="absolute inset-[27%] rounded-full border border-brand-primary/10 bg-[#F2F3F3]" />

      <div
        className="absolute inset-[8%] transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {visibleItems.map((dish) => {
          const isActive = dish.itemIndex === currentIndex;
          const angle = dish.displayIndex * 72 + 90;
          // Pushed orbit slightly wider (41) to ensure side images have safe space from the center
          const position = isActive ? { x: 50, y: 50 } : getOrbitPosition(angle, 41);
          // Optimized sizes (52% active, 20%/16% sides) so they are nicely sized without any overlap collision
          const size = isActive ? 52 : dish.displayIndex === 1 || dish.displayIndex === 5 ? 20 : 16;
          const opacity = isActive ? 1 : dish.displayIndex === 1 || dish.displayIndex === 5 ? 0.82 : 0.58;
          const zIndex = isActive ? 30 : 20 - dish.displayIndex;

          return (
            <div
              key={dish.name}
              className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-opacity duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                width: `${size}%`,
                height: `${size}%`,
                opacity,
                zIndex,
              }}
            >
              <div
                className="relative h-full w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                <div className="absolute inset-0 rounded-full bg-[#FFFFFF] shadow-[0_16px_36px_rgba(231, 28, 7,0.10)]" />
                <div className="absolute inset-[9%] rounded-full bg-[#FFFFFF]" />
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 48vw, (max-width: 1024px) 34vw, 360px"
                  className="object-contain p-[10%]"
                  priority={isActive}
                  loading={isActive ? "eager" : "lazy"}
                  unoptimized
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        key={heroItems[currentIndex].urduName}
        lang="ur"
        dir="rtl"
        className="font-ama-dhaba pointer-events-none absolute bottom-[8%] left-1/2 z-40 -translate-x-1/2 animate-hero-copy-fade whitespace-nowrap rounded-full border border-brand-primary/15 bg-[#FFFFFF]/95 px-4 py-0.5 text-[clamp(1.1rem,4vw,1.8rem)] font-black leading-normal text-brand-primary shadow-[0_8px_20px_rgba(231, 28, 7,0.15)] backdrop-blur-sm sm:bottom-[10%] lg:text-[clamp(1.4rem,2vw,2.2rem)]"
      >
        {heroItems[currentIndex].urduName}
      </div>
    </div>
  );
}
// fixesissue

function getOrbitPosition(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;

  return {
    x: 50 + Math.cos(radians) * radius,
    y: 50 + Math.sin(radians) * radius,
  };
}