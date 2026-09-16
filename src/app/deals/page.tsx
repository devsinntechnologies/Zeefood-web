import Link from "next/link";
import DealPage from "@/components/deals/DealPage";
import { fetchProductsApi } from "@/lib/store/productsApi";
import type { Product } from "@/lib/store";

export const metadata = {
  title: "Exclusive Deals - ZeeFood Premium",
  description: "Premium bundles, family feasts and limited-time specials coming soon.",
};

// Original Deals page is preserved for restoring live deals later.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function OriginalDealsPage() {
  let products: Product[] = [];

  try {
    const response = await fetchProductsApi({
      businessId: "5707b450-9723-4794-9ba4-ee03890cf504",
      page: 1,
      limit: 8,
    });
    products = response.data;
  } catch (error) {
    console.error("Deals page fetch failed", error);
  }

  return <DealPage products={products} />;
}

const teaserCards = [
  {
    number: "01",
    title: "Chef-Picked Bundles",
    desc: "Curated combos designed for a complete meal.",
  },
  {
    number: "02",
    title: "Family Feasts",
    desc: "Generous portions planned for sharing at home.",
  },
  {
    number: "03",
    title: "Limited Specials",
    desc: "Seasonal offers prepared with the same ZeeFood flavor.",
  },
];

export default function DealsPage() {
  // return <OriginalDealsPage />;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(231, 28, 7,0.12),_transparent_48%)] pt-28 text-brand-dark sm:pt-32">
      <section className="px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-brand-primary/12 bg-[#FFFFFF]/95 p-4 shadow-[0_25px_75px_rgba(15,23,42,0.07)] backdrop-blur-sm sm:p-6 lg:p-7">
          <div className="grid items-center gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[24px] border border-brand-primary/10 bg-white/80 p-5 shadow-[0_16px_40px_rgba(17,24,39,0.04)] sm:p-6">
              <div className="border-l-4 border-brand-primary/25 pl-5">
                <p className="text-[11px] font-black uppercase tracking-[0.34em] text-brand-primary">
                  Exclusive Deals
                </p>

                <h1 className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-tight text-brand-dark sm:text-5xl lg:text-[4rem]">
                  Coming
                  <span className="block text-brand-primary">Soon</span>
                </h1>

                <p className="mt-4 max-w-xl text-base font-medium leading-7 text-brand-dark/65">
                  Fresh bundles, family portions, and limited specials are being prepared with the same warm ZeeFood flavor.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/menu"
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-primary px-8 text-sm font-black uppercase tracking-widest text-white no-underline shadow-[0_12px_28px_rgba(231, 28, 7,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary/90"
                  >
                    View Menu
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-brand-primary/15 bg-white/80 px-8 text-sm font-black uppercase tracking-widest text-brand-dark no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/35 hover:text-brand-primary"
                  >
                    Home
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {teaserCards.map((card) => (
                <article
                  key={card.number}
                  className="group rounded-[20px] border border-brand-primary/10 bg-white/80 p-4 shadow-[0_12px_28px_rgba(17,24,39,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/20 hover:bg-brand-primary/5"
                >
                  <span className="text-[11px] font-black tracking-widest text-brand-primary">
                    {card.number}
                  </span>
                  <h2 className="mt-4 text-lg font-black uppercase leading-tight text-brand-dark transition-colors group-hover:text-brand-primary">
                    {card.title}
                  </h2>
                  <p className="mt-2.5 text-sm font-medium leading-6 text-brand-dark/60">
                    {card.desc}
                  </p>
                  <div className="mt-4 h-1 w-12 rounded-full bg-brand-primary transition-all duration-300 group-hover:w-16" />
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-[24px] border border-brand-primary/10 bg-white/70 p-4 text-sm font-medium text-brand-dark/65 shadow-[0_12px_28px_rgba(17,24,39,0.03)] sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <span>Deals launch soon with seasonal bundles and premium family favorites.</span>
            <span className="font-black uppercase tracking-[0.26em] text-brand-primary">Fresh offers coming your way</span>
          </div>

          <p className="mt-6 border-t border-brand-primary/10 pt-4 text-center text-sm font-bold text-brand-dark/55">
            Deals go live soon. Check back for fresh offers.
          </p>
        </div>
      </section>
    </main>
  );
}
