"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { allMenuItems } from "@/data/menuData";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const router = useRouter();
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const item = allMenuItems.find((menuItem) => menuItem.slug === slug);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="text-center">
          <h2 className="text-2xl font-black text-brand-dark mb-4 uppercase">Item Not Found</h2>
          <Link href="/menu" className="text-brand-primary font-bold hover:underline">Back to Menu</Link>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    const message = `*BUY NOW - ZEE FOOD GALLERY*\n\n*Item:* ${item.name} (${item.nameUr})\n*Price:* ${item.price}\n\nPlease confirm my order. Thank you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923354153368?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleAddToCart = () => {
    addToCart(item);
    router.push("/order");
  };

  return (
    <main className="min-h-screen bg-[#FFFFFF] pb-14 pt-28 sm:pt-32 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-brand-dark/50 hover:text-brand-primary font-black uppercase tracking-widest text-[10px] mb-7 transition-all group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to browsing
        </button>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          
          {/* Left Side: Cinematic Image Area */}
          <div className="lg:w-1/2">
            <div className="sticky top-40">
              <div className="no-cut-image relative aspect-square rounded-[2rem] lg:rounded-[3rem] overflow-hidden bg-gradient-to-br from-red-50 to-brand-white border border-gray-100 shadow-2xl group">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-contain p-6 sm:p-10 lg:p-12"
                  unoptimized
                />
                
                {/* Category Badge */}
                <div className="absolute top-8 left-8">
                  <span className="px-4 py-2 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Stats/Quick Info */}
              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 text-center">
                  <span className="block text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">{t("timeLabel")}</span>
                  <span className="text-lg font-black text-brand-dark">{language === "UR" ? item.details.prepTimeUr : item.details.prepTime}</span>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 text-center">
                  <span className="block text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">{t("priceLabel")}</span>
                  <span className="text-lg font-black text-brand-dark">{item.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Detailed Content Area */}
          <div className={`lg:w-1/2 flex flex-col ${language === "UR" ? "text-right" : "text-left"}`}>
            
            <div className="mb-8">
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.95] mb-4 flex flex-col text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                <span>{item.name}</span>
                <span className="text-2xl lg:text-3xl font-bold text-brand-dark/30 mt-2">({item.nameUr})</span>
              </h1>
              <div className={`w-24 h-2 bg-brand-primary rounded-full mb-5 ${language === "UR" ? "ml-auto" : ""}`} />
              
              {/* Bilingual Description */}
              <div className="space-y-4">
                <p className="text-xl lg:text-2xl text-brand-dark/80 font-medium leading-relaxed italic border-l-4 border-brand-primary/20 pl-6">
                  {item.description}
                </p>
                <p className="text-xl lg:text-2xl text-brand-dark/50 font-bold leading-relaxed pr-6 text-right font-urdu" dir="rtl">
                  {item.descriptionUr}
                </p>
              </div>
            </div>

            {/* How It's Made - BILINGUAL */}
            <div className="mb-8">
              <h4 className={`flex items-center gap-3 text-xs font-black text-brand-primary uppercase tracking-[0.2em] mb-5 ${language === "UR" ? "flex-row-reverse" : ""}`}>
                <span className="w-12 h-[2px] bg-brand-primary" />
                {t("howItsMade")}
              </h4>
              <div className="bg-white/50 rounded-[2rem] p-5 sm:p-6 border border-gray-100 shadow-sm space-y-4">
                <p className="text-lg text-brand-dark/70 font-medium leading-relaxed italic relative">
                  <span className="absolute -left-4 top-0 text-4xl text-brand-primary/10 font-serif">&quot;</span>
                  {item.details.recipe}
                </p>
                <div className="w-20 h-[1px] bg-gray-100 mx-auto" />
                <p className="text-lg text-brand-dark/40 font-bold leading-relaxed text-right font-urdu" dir="rtl">
                  {item.details.recipeUr}
                </p>
              </div>
            </div>

            {/* Key Ingredients - NOW BILINGUAL */}
            <div className="mb-8">
              <h4 className={`flex items-center gap-3 text-xs font-black text-brand-primary uppercase tracking-[0.2em] mb-4 ${language === "UR" ? "flex-row-reverse" : ""}`}>
                <span className="w-12 h-[2px] bg-brand-primary" />
                {t("keyIngredients")}
              </h4>
              <div className={`flex flex-wrap gap-3 ${language === "UR" ? "justify-end" : "justify-start"}`}>
                {item.details.ingredients.map((ing: string, i: number) => (
                  <span 
                    key={i} 
                    className="px-6 py-3 bg-white rounded-2xl text-xs font-bold text-brand-dark border border-gray-100 shadow-sm hover:border-brand-primary/30 hover:-translate-y-1 transition-all cursor-default flex flex-col items-center gap-1"
                  >
                    <span>{ing}</span>
                    <span className="text-[12px] text-brand-primary opacity-60 font-urdu">({item.details.ingredientsUr[i]})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-auto pt-7 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-brand-primary text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-[0_14px_30px_rgba(231, 28, 7,0.24)] hover:bg-brand-primary/90 transition-all active:scale-95"
              >
                {t("addToCart")}
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 py-4 bg-brand-primary text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:bg-[#E71C07] transition-all active:scale-95"
              >
                Buy Now
              </button>
            </div>

            {/* Security/Trust Badges */}
            <div className={`mt-7 flex items-center gap-5 ${language === "UR" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-center gap-2 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Authentic Taste</span>
              </div>
              <div className="flex items-center gap-2 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Fresh Daily</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
