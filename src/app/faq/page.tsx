import PremiumContentPage from "@/components/common/PremiumContentPage";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "FAQs — ZeeFood Premium" };

export default function FAQPage() {
  return (
    <PremiumContentPage 
      label="Support" 
      title1="Common Questions" 
      title2="" 
      description="Find quick answers to the most frequently asked questions about our food, delivery, and services."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {[
          { q: "How fast is the delivery?", a: "We guarantee a 30-45 minute delivery window for all central city locations. Your food arrives hot in our custom thermal packaging." },
          { q: "Are your meats Halal?", a: "Yes, 100% of our meat is strictly certified Halal and sourced from top-tier, export-grade suppliers." },
          { q: "Can I modify my order?", a: "Orders can be modified within the first 3 minutes of placement. After that, preparation begins to ensure fast delivery." },
          { q: "Do you cater for events?", a: "Absolutely! We offer premium catering for weddings, corporate events, and large gatherings. Contact us for a quote." }
        ].map((item, i) => (
          <div key={i} className="p-5 sm:p-7 bg-white border border-brand-primary/10 rounded-2xl shadow-sm hover:shadow-[0_18px_42px_rgba(231, 28, 7,0.10)] transition-all group">
            <h3 className="text-xl sm:text-2xl font-black text-brand-dark mb-4 group-hover:text-brand-primary transition-colors flex items-start gap-4 leading-tight">
              <span className="text-brand-primary/35 text-4xl sm:text-5xl font-serif italic -mt-2 shrink-0">Q.</span>
              {item.q}
            </h3>
            <p className="text-brand-dark/70 leading-relaxed pl-10 sm:pl-12 font-semibold text-base sm:text-lg">
              {item.a}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-5 sm:p-7 bg-[#FFFFFF] rounded-2xl text-center text-brand-dark relative overflow-hidden shadow-[0_24px_70px_rgba(231, 28, 7,0.10)] border border-brand-primary/15">
        <div className="absolute inset-x-0 top-0 h-1 bg-brand-primary" />
        <h3 className="text-3xl font-black mb-4 relative z-10">Still need help?</h3>
        <p className="text-brand-dark/70 mb-6 relative z-10 max-w-lg mx-auto text-lg font-medium">
          Our VIP support team is available 24/7. Reach out to us anytime.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-4 px-10 py-4 bg-brand-primary text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-brand-primary/90 transition-all duration-300 relative z-10 shadow-xl">
          Contact Support
        </Link>
      </div>
    </PremiumContentPage>
  );
}
