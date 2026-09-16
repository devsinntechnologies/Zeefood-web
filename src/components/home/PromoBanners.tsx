"use client";
import Image from "next/image";
import Link from "next/link";

const promoCards = [
  {
    id: 1,
    tag: "Order Online",
    headline: "HOT FOOD,\nFAST DELIVERY",
    headlineUr: "تازہ کھانا، تیز ترین ڈیلیوری",
    subtext: "Fresh from our kitchen to your doorstep in 30 minutes or less.",
    cta: "Order Now",
    href: "/order",
    image: "/images/home/promo/promo_delivery.jpg",
    overlayFrom: "from-brand-overlay/90",
    overlayTo: "to-transparent",
    overlayDir: "bg-gradient-to-r",
    accentColor: "text-brand-dark",
    badgeColor: "bg-brand-primary text-white",
    size: "large", // spans 2 cols
  },
  {
    id: 2,
    tag: "Family Size",
    headline: "BIRYANI\nFEAST",
    headlineUr: "بریانی کی دعوت",
    subtext: "Golden saffron Dum Biryani. Made for the whole family.",
    cta: "View Menu",
    href: "/product/nawabi-chicken-biryani",
    image: "/images/home/promo/promo_biryani.jpg",
    overlayFrom: "from-brand-overlay/85",
    overlayTo: "to-transparent",
    overlayDir: "bg-gradient-to-t",
    accentColor: "text-brand-dark",
    badgeColor: "bg-brand-secondary text-white",
    size: "small",
  },
  {
    id: 3,
    tag: "Chef Special",
    headline: "KARAHI\nNIGHT",
    headlineUr: "کڑاہی نائٹ",
    subtext: "Peshawari-style Mutton Karahi. Authentic. Fiery. Unforgettable.",
    cta: "Explore",
    href: "/product/special-mutton-karahi",
    image: "/images/home/promo/promo_karahi.jpg",
    overlayFrom: "from-brand-overlay/85",
    overlayTo: "to-transparent",
    overlayDir: "bg-gradient-to-t",
    accentColor: "text-[#FEE962]",
    badgeColor: "bg-brand-primary text-white",
    size: "small",
  },
  {
    id: 4,
    tag: "Frozen Range",
    headline: "STOCK UP\nYOUR FREEZER",
    headlineUr: "اپنا فریزر بھر لیں",
    subtext: "Export-quality frozen kebabs, samosas & parathas. Always ready.",
    cta: "Shop Frozen",
    href: "/menu",
    image: "/images/home/promo/promo_frozen.jpg",
    overlayFrom: "from-[#0a1628]/90",
    overlayTo: "to-transparent",
    overlayDir: "bg-gradient-to-r",
    accentColor: "text-cyan-300",
    badgeColor: "bg-cyan-500 text-white",
    size: "large", // spans 2 cols
  },
];

export default function PromoBanners() {
  return (
    <section className="bg-brand-light py-16 sm:py-20 lg:py-24 w-full relative z-10 overflow-hidden">

      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_rgba(231, 28, 7,0.07)_0%,_transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(231, 28, 7,0.07)_0%,_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-gray-100 shadow-sm mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary" />
            </span>
            <span className="text-brand-dark/80 text-[10px] sm:text-xs font-black tracking-widest uppercase">Featured Promotions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[4.5rem] font-black tracking-tight uppercase font-sans leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
            Don&apos;t Miss Out
          </h2>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 gap-5 auto-rows-[minmax(250px,auto)] sm:auto-rows-[280px] md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[320px]">

          {/* Card 1 — Large (2 cols) */}
          <PromoCard card={promoCards[0]} className="md:col-span-2 lg:col-span-2" />

          {/* Card 2 — Small */}
          <PromoCard card={promoCards[1]} className="md:col-span-1 lg:col-span-1" />

          {/* Card 3 — Small */}
          <PromoCard card={promoCards[2]} className="md:col-span-1 lg:col-span-1" />

          {/* Card 4 — Large (2 cols) */}
          <PromoCard card={promoCards[3]} className="md:col-span-2 lg:col-span-2" />

          {/* Extra CTA Card */}
          <div className="md:col-span-2 lg:col-span-2 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-brand-primary to-[#E71C07] p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden group">
            {/* Decorative orb */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black/10 rounded-full blur-xl pointer-events-none" />
            {/* Decorative diagonal bars */}
            <div className="absolute right-10 top-0 bottom-0 flex gap-3 opacity-10 pointer-events-none">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="w-8 bg-white skew-x-[-10deg]" />
              ))}
            </div>

            <div className="relative z-10">
              <span className="text-white/80 text-[10px] sm:text-xs font-black tracking-widest uppercase block mb-4">Craving Something?</span>
              <h3 className="text-white font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-none drop-shadow-lg">
                YOUR TABLE<br />
                <span className="text-brand-dark italic drop-shadow-lg">AWAITS</span>
              </h3>
            </div>

            <div className="relative z-10 flex flex-col items-stretch gap-4 mt-8 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="/menu"
                className="inline-flex justify-center px-6 sm:px-8 py-4 bg-white text-brand-primary font-black uppercase tracking-widest text-xs sm:text-sm rounded-full hover:bg-brand-overlay hover:text-white transition-all duration-300 shadow-xl hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1"
              >
                View Full Menu
              </Link>
              <Link
                href="/order"
                className="text-white/80 font-bold uppercase tracking-widest text-xs sm:text-sm hover:text-white transition-colors flex items-center justify-center gap-2 sm:justify-start"
              >
                Order Now
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Reusable Promo Card
function PromoCard({ card, className }: { card: typeof promoCards[0]; className?: string }) {
  return (
    <Link
      href={card.href}
      className={`no-cut-image relative rounded-2xl sm:rounded-[2rem] overflow-hidden group cursor-pointer block bg-brand-surface ${className}`}
    >
      {/* Background Image */}
      <Image
        src={card.image}
        alt={card.headline}
        fill
        className="object-contain transition-transform duration-700 ease-out"
        unoptimized
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${card.overlayDir} ${card.overlayFrom} ${card.overlayTo} transition-opacity duration-500 group-hover:opacity-90`} />

      {/* Hover Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 p-5 sm:p-7 lg:p-9 flex flex-col justify-between z-20">
        {/* Top: Badge */}
        <div>
          <span className={`inline-block px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black tracking-widest uppercase ${card.badgeColor} shadow-lg`}>
            {card.tag}
          </span>
        </div>

        {/* Bottom: Text & CTA */}
        <div>
          <h3 className={`font-black text-white uppercase tracking-tight leading-[0.95] whitespace-pre-line drop-shadow-lg mb-3 flex flex-col ${card.size === 'large' ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-4xl'}`}>
            <span>{card.headline}</span>
            <span className="text-base sm:text-xl lg:text-2xl font-bold opacity-80 font-urdu">({card.headlineUr})</span>
          </h3>
          <p className={`text-white/70 text-sm font-medium leading-relaxed mb-6 ${card.size === 'large' ? 'max-w-sm' : 'max-w-xs'}`}>
            {card.subtext}
          </p>
          <div className="flex items-center gap-2">
            <span className={`font-black uppercase tracking-widest text-xs ${card.accentColor} group-hover:underline underline-offset-4 transition-all`}>
              {card.cta}
            </span>
            <svg className="w-4 h-4 text-white/70 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Corner Glow on Hover */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Link>
  );
}
