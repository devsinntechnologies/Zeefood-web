import ExploreMenu from "@/components/home/ExploreMenu";
import SignatureDesi from "@/components/home/SignatureDesi";
import TopDeals from "@/components/home/TopDeals";
import Hero from "@/components/home/Hero";
import CulinarySecrets from "@/components/home/CulinarySecrets";
// import PromoBanners from "@/components/home/PromoBanners";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbf7f2] relative overflow-x-hidden">
      <Hero />
      <ExploreMenu />
      <SignatureDesi />
      <TopDeals />
      <CulinarySecrets />
      {/* <PromoBanners /> */}
    </main>
  );
}
