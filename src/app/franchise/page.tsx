import PremiumContentPage from "@/components/common/PremiumContentPage";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Franchise — ZeeFood Premium" };

export default function FranchisePage() {
  return (
    <PremiumContentPage 
      label="Business" 
      title1="Own a Franchise" 
      title2="" 
      description="Partner with Pakistan&apos;s fastest-growing premium food brand and build a lucrative business."
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-3xl lg:text-4xl font-black mb-6 flex items-center gap-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Why Partner With Us?</span>
          </h2>
          <p className="text-xl leading-relaxed text-brand-dark/80">
            A ZeeFood franchise offers a turn-key business model backed by high-end technology, powerful marketing, and an exceptionally loyal customer base. We provide comprehensive training, supply chain logistics, and continuous operational support.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#F2F3F3] p-6 sm:p-7 rounded-[32px] border border-brand-primary/5 shadow-sm">
            <h3 className="text-xl font-black mb-4 text-brand-primary uppercase tracking-[0.2em] text-sm">Requirements</h3>
            <ul className="space-y-4">
              {[
                "Minimum liquid capital of Rs 5.0 Million",
                "Prime real estate location (min 1,200 sq ft)",
                "Commitment to ZeeFood&apos;s premium standards",
                "Prior experience in F&B management preferred"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-brand-dark font-bold text-lg">
                  <span className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-3.5 h-3.5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#FFFFFF] p-6 sm:p-7 rounded-[32px] text-brand-dark flex flex-col justify-center shadow-[0_18px_42px_rgba(231, 28, 7,0.10)] border border-brand-primary/15">
            <h3 className="text-4xl font-black mb-4 italic tracking-tighter">THE FUTURE OF <span className="text-brand-primary">DESI FOOD</span></h3>
            <p className="text-brand-dark/70 text-lg leading-relaxed font-medium">
              We are not just a restaurant; we are a technology-driven food movement. Join us in scaling the most loved desi brand in the region.
            </p>
          </div>
        </section>

        <div className="mt-8 p-6 sm:p-8 bg-[#FFFFFF] rounded-[32px] text-center relative overflow-hidden group shadow-[0_24px_70px_rgba(231, 28, 7,0.10)] border border-brand-primary/15">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(231, 28, 7,0.12),transparent_55%)] pointer-events-none" />
          <h3 className="text-3xl lg:text-4xl font-black text-brand-dark mb-4 relative z-10">Ready to start?</h3>
          <p className="text-brand-dark/70 mb-6 max-w-md mx-auto relative z-10 text-lg">
            Submit your proposal to our franchise development team and we&apos;ll get back to you within 48 hours.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-brand-primary hover:bg-[#E71C07] text-white font-black uppercase tracking-widest text-sm rounded-full transition-all duration-300 shadow-[0_15px_35px_rgba(231, 28, 7,0.4)] hover:-translate-y-1 relative z-10">
            Apply Now
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </PremiumContentPage>
  );
}
