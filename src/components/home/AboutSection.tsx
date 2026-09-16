"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  const journey = [
    {
      year: "01",
      title: "Started with a simple kitchen idea",
      description: "A family-led mission to serve desi food that feels honest, warm, and memorable from the very first plate.",
    },
    {
      year: "02",
      title: "Built a loyal neighborhood following",
      description: "Word of mouth, repeat guests, and consistent quality helped turn a small idea into a trusted local brand.",
    },
    {
      year: "03",
      title: "Growing with the same values",
      description: "We continue to focus on freshness, hospitality, and the flavors that keep families coming back.",
    },
  ];

  const highlights = [
    {
      title: "Fresh ingredients",
      description: "We keep sourcing simple and quality-driven so every dish tastes clean, vibrant, and satisfying.",
    },
    {
      title: "Warm service",
      description: "Our team is trained to make every visit feel personal, attentive, and genuinely welcoming.",
    },
    {
      title: "Authentic flavor",
      description: "We respect traditional recipes while refining the experience for a premium dining feel.",
    },
    {
      title: "Family-friendly dining",
      description: "From casual meals to celebrations, our space is designed to feel comfortable for everyone.",
    },
  ];

  const testimonials = [
    {
      quote: "Best biryani in town — rich spices and perfectly cooked rice. A regular favourite!",
      author: "Ubaid Asim",
      role: "Customer",
    },
    {
      quote: "Consistently good food and warm service. Feels like home every time.",
      author: "Arham Sarwar",
      role: "Customer",
    },
    {
      quote: "Great place for family dinners — large portions and authentic flavours.",
      author: "Azan Asim",
      role: "Local Guide",
    },
  ];

  const faqs = [
    { q: "Do you offer delivery?", a: "Yes — we deliver across our service areas. Choose delivery at checkout or contact us on WhatsApp." },
    { q: "Can I pick up an order?", a: "Yes — choose pickup in the order flow and collect from our store when ready." },
    { q: "Do you cater events?", a: "We offer catering for small to medium events. Contact us with your requirements for a quote." },
  ];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-8 sm:py-10 lg:py-12 2xl:py-14 bg-[#F2F3F3] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-7 sm:mb-8 lg:mb-10 text-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-brand-primary" />
            <span className="text-brand-primary text-[10px] sm:text-xs font-black tracking-widest uppercase">
              {t("aboutTitle")}
            </span>
            <div className="w-12 h-[2px] bg-brand-primary" />
          </div>
          <h2 className="text-[clamp(2rem,8vw,3.5rem)] font-medium text-brand-dark mb-4 italic">
            {t("aboutSubtitle")}
          </h2>
        </div>

        {/* Portrait & Bio: clean two-column responsive layout */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center max-w-4xl mx-auto">
            <div className="flex justify-center md:justify-start">
              <div className="no-cut-image w-56 h-64 md:w-72 md:h-80 rounded-[2rem] overflow-hidden bg-[#FFFFFF] shadow-[0_20px_55px_rgba(15,23,42,0.08)] ring-1 ring-brand-primary/15">
                <Image
                  src="/amir-bhai.jpeg"
                  alt="Mr Amir"
                  width={288}
                  height={320}
                  className="h-full w-full object-contain object-center"
                />
              </div>
            </div>

            <div className="text-center md:text-left md:border-l-4 md:border-brand-primary/30 md:pl-6">
              <p className="text-brand-primary uppercase text-xs font-semibold tracking-wider mb-2">Our Founder</p>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-brand-dark mb-4">Mr. Amir — Founder & Owner</h3>

              <div className="space-y-4">
                <p className="text-brand-dark/80 leading-relaxed">
                  Mr. Amir founded this restaurant with a simple belief: excellent food and genuine hospitality bring people together. Over the years he built the business through hands-on leadership, careful sourcing, and a deep respect for local flavors.
                </p>

                <p className="text-brand-dark/70 leading-relaxed">
                  His values continue to guide Zee Food Gallery—quality ingredients, warm service, and a commitment to the neighborhood. That legacy informs everything we do, from the dishes we serve to the way we present our story online.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          
          {/* Card 1: Fresh Food */}
          <div className="group relative bg-[#FFFFFF] border border-brand-primary/10 p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:border-brand-primary/25 hover:bg-brand-primary/5 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            {/* <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform duration-500">
               <span className="text-4xl">🥗</span>
            </div> */}
            <h3 className="text-2xl font-black text-brand-dark mb-4 uppercase transition-colors group-hover:text-brand-primary">
              {t("freshFoodTitle")}
            </h3>
            <p className="text-brand-dark/50 font-medium leading-relaxed transition-colors group-hover:text-brand-dark/70">
              {t("freshFoodDesc")}
            </p>
            
            {/* Decorative element */}
            <div className="absolute top-12 right-12 text-8xl font-black text-brand-primary/[0.06] pointer-events-none transition-colors">01</div>
          </div>

          {/* Card 2: Local Staff */}
          <div className="group relative bg-[#FFFFFF] border border-brand-primary/10 p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:border-brand-primary/25 hover:bg-brand-primary/5 shadow-[0_20px_50px_rgba(0,0,0,0.02)] lg:mt-8">
            {/* <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform duration-500">
               <span className="text-4xl">👨‍🍳</span>
            </div> */}
            <h3 className="text-2xl font-black text-brand-dark mb-4 uppercase transition-colors group-hover:text-brand-primary">
              {t("localStaffTitle")}
            </h3>
            <p className="text-brand-dark/50 font-medium leading-relaxed transition-colors group-hover:text-brand-dark/70">
              {t("localStaffDesc")}
            </p>

            <div className="absolute top-12 right-12 text-8xl font-black text-brand-primary/[0.06] pointer-events-none transition-colors">02</div>
          </div>

          {/* Card 3: Authentic Desi */}
          <div className="group relative bg-[#FFFFFF] border border-brand-primary/10 p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:border-brand-primary/25 hover:bg-brand-primary/5 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            {/* <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform duration-500">
               <span className="text-4xl">🥘</span>
            </div> */}
            <h3 className="text-2xl font-black text-brand-dark mb-4 uppercase transition-colors group-hover:text-brand-primary">
              {t("desiDiningTitle")}
            </h3>
            <p className="text-brand-dark/50 font-medium leading-relaxed transition-colors group-hover:text-brand-dark/70">
              {t("desiDiningDesc")}
            </p>

            <div className="absolute top-12 right-12 text-8xl font-black text-brand-primary/[0.06] pointer-events-none transition-colors">03</div>
          </div>

        </div>
        {/* My Vision Section */}
        <div className="mt-9 sm:mt-10 max-w-4xl mx-auto rounded-2xl sm:rounded-[2rem] border border-brand-primary/10 bg-gradient-to-br from-brand-primary/5 via-[#FFFFFF] to-brand-secondary/5 p-5 sm:p-6 lg:p-8 shadow-sm text-center">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.35em] text-brand-primary mb-4">
            <span className="h-px w-8 bg-brand-primary" />
            My Vision
            <span className="h-px w-8 bg-brand-primary" />
          </span>
          <p className="text-lg lg:text-xl text-brand-dark/75 leading-relaxed max-w-3xl mx-auto font-medium">
            My vision is to build a place where authentic desi food feels both timeless and welcoming, where every dish is made with care, every guest feels at home, and every visit reflects the warmth, flavor, and pride of our community.
          </p>
        </div>

        {/* Journey + Highlights */}
        <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 2xl:gap-8 items-start">
          <div className="rounded-2xl sm:rounded-[2rem] bg-[#FFFFFF] border border-brand-primary/10 p-5 sm:p-6 lg:p-7 shadow-sm">
            <span className="text-brand-primary text-[10px] sm:text-xs font-black tracking-widest uppercase">Our Journey</span>
            <h3 className="mt-3 text-2xl sm:text-3xl font-medium text-brand-dark">From a family idea to a neighborhood favorite</h3>
            <div className="mt-5 space-y-4">
              {journey.map((item) => (
                <div key={item.year} className="flex items-start gap-5 rounded-[1.25rem] border border-transparent p-2 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/15 hover:bg-brand-primary/5">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-black text-sm shadow-lg">
                    {item.year}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-brand-dark">{item.title}</h4>
                    <p className="mt-2 text-sm lg:text-base text-brand-dark/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-[2rem] bg-[#FFFFFF] border border-brand-primary/10 p-5 sm:p-6 lg:p-7 shadow-sm">
            <div className="border-l-4 border-brand-primary/25 pl-5">
              <span className="text-brand-primary text-[10px] sm:text-xs font-black tracking-widest uppercase">What makes us different</span>
              <h3 className="mt-3 text-2xl sm:text-3xl font-medium text-brand-dark">A kitchen built on trust, taste, and consistency</h3>
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-brand-primary/10 bg-white/75 p-5 shadow-[0_12px_28px_rgba(17,24,39,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/20 hover:bg-brand-primary/5">
                  <h4 className="text-base font-medium text-brand-dark">{item.title}</h4>
                  <p className="mt-2 text-sm text-brand-dark/65 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner Image Section */}
        {/* Testimonials */}
        <div className="mt-12 max-w-[1100px] mx-auto">
          <h3 className="text-2xl font-medium text-brand-dark text-center mb-5">What People Are Saying</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((titem, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <p className="text-brand-dark/70 italic">“{titem.quote}”</p>
                <div className="mt-4 text-sm font-medium text-brand-dark">{titem.author}</div>
                <div className="text-xs text-brand-dark/50">{titem.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Meet The Kitchen */}
        {/* <div className="mt-16 max-w-[1100px] mx-auto">
          <h3 className="text-2xl font-black text-brand-dark text-center mb-8">Meet The Kitchen</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {staff.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100">
                  <Image src={s.image} alt={s.name} width={112} height={112} className="object-contain" />
                </div>
                <div className="text-lg font-black text-brand-dark">{s.name}</div>
                <div className="text-sm text-brand-dark/60">{s.role}</div>
              </div>
            ))}
          </div>
        </div> */}

        {/* FAQ */}
        <div className="mt-12 max-w-[900px] mx-auto">
          <h3 className="text-2xl font-medium text-brand-dark text-center mb-5">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((f, idx) => (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/20 hover:bg-brand-primary/5 hover:shadow-[0_16px_34px_rgba(17,24,39,0.06)]">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between bg-white/90 px-6 py-4 text-left transition-colors duration-300 hover:bg-brand-primary/5"
                >
                  <span className="font-medium text-brand-dark">{f.q}</span>
                  <span className="text-brand-dark/50">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div className="bg-white/50 px-6 py-4 text-brand-dark/70">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner Image Section */}
        <div className="no-cut-image mt-12 lg:mt-16 relative h-[300px] sm:h-[380px] lg:h-[480px] rounded-[2rem] lg:rounded-[3rem] overflow-hidden group shadow-2xl bg-brand-surface">
          <Image 
            src="/images/home/promo/hq720.jpg" 
            alt="Authentic Dining" 
            fill 
            sizes="(max-width: 1024px) 100vw, 1400px"
            loading="eager"
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-overlay via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-12 left-6 lg:left-12 lg:bottom-20 max-w-2xl">
             <h4 className="text-3xl lg:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
               {t("brandName")}
             </h4>
             <p className="text-white/60 font-medium text-lg lg:text-xl leading-relaxed">
                Where every meal tells a story of tradition, passion, and the finest local flavors.
             </p>
          </div>
        </div>

      </div>
    </section>
  );
}
