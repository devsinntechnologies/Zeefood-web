import PremiumContentPage from "@/components/common/PremiumContentPage";

export default function TermsConditionsPage() {
  return (
    <PremiumContentPage 
      label="Legal & Compliance" 
      title1="Terms &" 
      title2="Conditions" 
      description="Last updated: May 2026. Please read these terms carefully before using ZeeFood services."
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-black mb-4 text-brand-primary">
            1. Acceptance of Terms
          </h2>
          <p className="text-brand-dark/80 leading-relaxed text-base sm:text-lg">
            By accessing and using the ZeeFood website and mobile applications (the &quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black mb-4 text-brand-primary">
            2. Description of Service
          </h2>
          <p className="text-brand-dark/80 leading-relaxed text-base sm:text-lg">
            ZeeFood provides users with access to a rich collection of resources, including various communications tools, forums, shopping services, and personalized content. You also understand and agree that the Service may include advertisements and that these advertisements are necessary for ZeeFood to provide the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black mb-4 text-brand-primary">
            3. User Obligations
          </h2>
          <p className="text-brand-dark/80 leading-relaxed mb-4 text-base sm:text-lg">
            In consideration of your use of the Service, you represent that you are of legal age to form a binding contract and are not a person barred from receiving services. You also agree to:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { t: "Accurate Info", d: "Provide true, accurate, and complete registration data." },
              { t: "Security", d: "Maintain the confidentiality of your account credentials." },
              { t: "Compliance", d: "Use the service in accordance with all local and international laws." },
              { t: "Conduct", d: "Refrain from any activities that may harm the service or other users." }
            ].map((item, i) => (
              <li key={i} className="p-4 sm:p-5 bg-white border border-brand-primary/10 rounded-2xl shadow-sm">
                <strong className="text-brand-dark block mb-2">{item.t}</strong>
                <span className="text-sm text-brand-dark/60 font-medium">{item.d}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black mb-4 text-brand-primary">
            4. Delivery Policies
          </h2>
          <p className="text-brand-dark/80 leading-relaxed text-base sm:text-lg">
            Delivery periods quoted at the time of ordering are approximate only and may vary. Goods will be delivered to the address designated by you at the time of ordering.
          </p>
        </section>

        <div className="mt-8 p-5 sm:p-7 bg-[#FFFFFF] rounded-2xl text-brand-dark flex flex-col md:flex-row items-center gap-5 shadow-[0_24px_70px_rgba(231, 28, 7,0.10)] border border-brand-primary/15">
          <div className="text-6xl shrink-0">📜</div>
          <div>
            <h3 className="text-2xl font-black mb-3 italic text-brand-primary">Legal Commitment</h3>
            <p className="text-brand-dark/70 m-0 text-lg font-medium leading-relaxed">
              We are committed to providing a fair and transparent service. If you have any concerns regarding these terms, please contact our legal team.
            </p>
          </div>
        </div>
      </div>
    </PremiumContentPage>
  );
}
