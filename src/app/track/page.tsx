import PremiumContentPage from "@/components/common/PremiumContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Track Order — ZeeFood Premium" };

export default function TrackOrderPage() {
  return (
    <PremiumContentPage 
      label="Delivery" 
      title1="Track Your" 
      title2="Order" 
      description="Enter your order ID to see real-time updates on your premium meal's preparation and delivery status."
    >
      <div className="max-w-2xl mx-auto py-2 sm:py-4">
        <section className="bg-white p-5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-[32px] border border-brand-primary/10 shadow-[0_24px_70px_rgba(231, 28, 7,0.10)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-brand-primary/10 to-transparent rounded-full -mr-24 -mt-24" />
          
          <div className="flex flex-col gap-5 relative z-10">
            <label className="font-black text-brand-dark uppercase tracking-widest text-xs opacity-40">Order tracking ID</label>
            <div className="flex flex-col sm:flex-row gap-5">
              <input 
                type="text" 
                placeholder="e.g. ZF-9824" 
                className="min-w-0 flex-1 bg-[#F2F3F3] border-2 border-transparent rounded-2xl sm:rounded-[24px] px-5 sm:px-8 py-4 sm:py-5 text-lg sm:text-2xl font-black text-brand-dark focus:outline-none focus:border-brand-primary focus:bg-white transition-all placeholder:text-brand-dark/20 shadow-inner"
              />
              <button className="px-8 sm:px-12 py-4 sm:py-5 bg-brand-primary text-white font-black uppercase tracking-widest text-sm rounded-2xl sm:rounded-[24px] hover:bg-brand-primary/90 transition-all duration-300 shadow-[0_14px_30px_rgba(231, 28, 7,0.24)] hover:shadow-[0_20px_40px_rgba(231, 28, 7,0.3)] hover:-translate-y-1">
                Track
              </button>
            </div>
            <p className="text-sm text-brand-dark/40 font-bold italic">
              * Found in your confirmation email or SMS.
            </p>
          </div>
        </section>

        <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center text-center">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-5 sm:mb-6">
            <div className="absolute inset-0 bg-brand-primary/10 rounded-full animate-ping opacity-30" />
            <div className="absolute inset-6 bg-brand-primary/20 rounded-full" />
            <div className="relative w-full h-full bg-white rounded-full border border-brand-primary/10 shadow-[0_18px_42px_rgba(231, 28, 7,0.10)] flex items-center justify-center text-6xl">
              📍
            </div>
          </div>
          <h4 className="font-black text-brand-dark text-3xl sm:text-4xl mb-4">Live Tracking</h4>
          <p className="text-brand-dark/60 text-base sm:text-xl max-w-md mx-auto leading-relaxed font-bold italic">
            Enter your Order ID above to see the live map and real-time courier location.
          </p>
        </div>
      </div>
    </PremiumContentPage>
  );
}
