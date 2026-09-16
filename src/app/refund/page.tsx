import PremiumContentPage from "@/components/common/PremiumContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Refund Policy — ZeeFood Premium" };

export default function RefundPage() {
  return (
    <PremiumContentPage 
      label="Legal" 
      title1="Refund Policy" 
      title2="" 
      description="Our commitment to quality is absolute. Learn about our clear, hassle-free refund and resolution process."
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl lg:text-4xl font-black mb-4 text-brand-primary">
            The ZeeFood Guarantee
          </h2>
          <p className="text-lg leading-relaxed text-brand-dark/80">
            We pride ourselves on delivering hot, fresh, and perfectly prepared meals. If your order does not meet our premium standards, we are committed to making it right through a replacement or a full refund.
          </p>
        </section>

        <section>
          <h2 className="font-black mb-5 text-brand-dark uppercase tracking-[0.2em] text-sm opacity-60">Eligibility for Refunds</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t: "Incorrect Items", d: "If you received the wrong item, we'll replace it immediately or refund it." },
              { t: "Missing Items", d: "Any missing items will be refunded to your original payment method." },
              { t: "Quality Issues", d: "If food quality is compromised during transit, we take full responsibility." }
            ].map((item, i) => (
              <div key={i} className="p-5 sm:p-6 bg-white border border-brand-primary/10 rounded-2xl shadow-sm hover:shadow-[0_16px_38px_rgba(231, 28, 7,0.10)] transition-all">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-4 text-brand-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-black text-brand-dark text-lg mb-3">{item.t}</h4>
                <p className="text-brand-dark/70 text-sm font-medium leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-black mb-4 text-brand-dark uppercase tracking-[0.2em] text-sm opacity-60">Resolution Process</h2>
          <p className="text-lg leading-relaxed text-brand-dark/80">
            Please contact our support team within <strong>1 hour</strong> of receiving your order. Our VIP support team resolves 95% of claims within 15 minutes. Approved refunds are processed immediately.
          </p>
        </section>

        <div className="mt-8 p-5 sm:p-7 bg-[#FFFFFF] rounded-2xl text-brand-dark flex flex-col md:flex-row items-center gap-5 shadow-[0_24px_70px_rgba(231, 28, 7,0.10)] border border-brand-primary/15">
          <div className="text-6xl shrink-0">💳</div>
          <div>
            <h3 className="text-2xl font-black mb-2 italic text-brand-primary">Processing Time</h3>
            <p className="text-brand-dark/70 m-0 text-lg font-medium leading-relaxed">
              Refunds reflect in your account within <strong>3-5 business days</strong> depending on your bank&apos;s policies.
            </p>
          </div>
        </div>
      </div>
    </PremiumContentPage>
  );
}
