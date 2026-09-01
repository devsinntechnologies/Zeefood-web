"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = {
  Menu: [
    { label: <>Desi Cuisine <span className="font-urdu opacity-70">(دیسی کھانے)</span></>, href: "/menu" },
    { label: <>Frozen Foods <span className="font-urdu opacity-70">(منجمد اشیاء)</span></>, href: "/menu" },
    { label: <>Family Deals <span className="font-urdu opacity-70">(فیملی ڈیلز)</span></>, href: "/menu" },
    { label: <>New Arrivals <span className="font-urdu opacity-70">(نئی اشیاء)</span></>, href: "/menu" },
    { label: <>Seasonal Specials <span className="font-urdu opacity-70">(موسمی پکوان)</span></>, href: "/menu" },
  ],
  Company: [
    { label: "About ZeeFood", href: "/about" },
    { label: "Our Story", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press & Media", href: "/press" },
    { label: "Franchise", href: "/franchise" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    // { label: "Track Order", href: "/track" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/zeefoodg/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/ZeeFood_786",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.net/@zeefoodg",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.143 14.286c0 .857-.643 1.572-1.429 1.572h-3.428c-.786 0-1.429-.715-1.429-1.572v-4.572c0-.857.643-1.572 1.429-1.572h3.428c.786 0 1.429.715 1.429 1.572v4.572zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.143 14.286c0 1.714-1.286 3.143-2.857 3.143H9.714c-1.571 0-2.857-1.429-2.857-3.143V9.714c0-1.714 1.286-3.143 2.857-3.143h4.572c1.571 0 2.857 1.429 2.857 3.143v4.572z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/zeefoodg/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.397 2.965 7.397 6.93 0 4.135-2.607 7.462-6.223 7.462-1.215 0-2.358-.631-2.75-1.37l-.749 2.848c-.27 1.029-1.002 2.319-1.492 3.111 1.121.344 2.309.531 3.541.531 6.621 0 12-5.379 12-12S18.638 0 12.017 0z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@zeefoodgallerly",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname?.startsWith("/self")) return null;

  return (
    <footer className="bg-[#FFFFFF] border-t border-gray-100 relative overflow-hidden">

      {/* Decorative top gradient strip */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-primary via-brand-secondary to-amber-400" />

      {/* Background orbs */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-primary/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-secondary/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="site-container relative z-10">

        {/* TOP CTA Strip */}
        {/* <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-12 border-b border-gray-100">
          <div>
            <h3 className="text-2xl lg:text-3xl font-medium text-brand-dark tracking-tight">
              Ready to{" "}
              <span className="text-brand-primary">
                Order?
              </span>
            </h3>
            <p className="text-brand-dark/50 font-medium mt-1">Hot food delivered to your doorstep in 30 minutes.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/order" className="px-8 py-4 bg-brand-primary  text-white font-medium uppercase tracking-widest text-xs rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(248,114,5,0.3)] hover:shadow-[0_15px_40px_rgba(248,114,5,0.5)] hover:-translate-y-0.5">
              Order Online
            </Link>
            <a href="https://wa.me/923354153368" className="px-8 py-4 bg-white border border-gray-200 text-brand-dark hover:border-brand-primary hover:text-brand-primary font-medium uppercase tracking-widest text-xs rounded-xl transition-all duration-300 shadow-sm hover:-translate-y-0.5 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Order on WhatsApp
            </a>
          </div>
        </div> */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-5 border-b border-gray-100 sm:py-6 lg:py-7 2xl:py-8">
          {/* Left Text Section (Centered on Mobile) */}
          <div className="text-center md:text-left w-full md:w-auto">
            <h3 className="text-2xl lg:text-3xl font-medium text-brand-dark tracking-tight">
              Ready to{" "}
              <span className="text-brand-primary">
                Order?
              </span>
            </h3>
            <p className="text-brand-dark/50 font-medium mt-1">Hot food delivered to your doorstep in 30 minutes.</p>
          </div>

          {/* Right Buttons Section (Column on Mobile, Row on Desktop) */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <Link href="/order" className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap px-8 py-4 bg-brand-primary text-white font-medium uppercase tracking-widest text-xs rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(248,114,5,0.3)] hover:shadow-[0_15px_40px_rgba(248,114,5,0.5)] hover:-translate-y-0.5">
              Order Online
            </Link>
            <a href="https://wa.me/92341330336" className="w-full sm:w-auto justify-center whitespace-nowrap px-8 py-4 bg-white border border-gray-200 text-brand-dark hover:border-brand-primary hover:text-brand-primary font-medium uppercase tracking-widest text-xs rounded-xl transition-all duration-300 shadow-sm hover:-translate-y-0.5 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Order on WhatsApp
            </a>
          </div>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-5 lg:gap-7 2xl:gap-8 2xl:py-6">

          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="inline-flex w-fit max-w-full items-center gap-3 no-underline">
              <span className="relative block h-20 w-24 shrink-0">
                <Image
                  src="/fiery-wok.png"
                  alt="Ama G Ka Dhaba"
                  fill
                  className="object-contain object-center"
                  unoptimized
                />
              </span>
              <span lang="ur" dir="rtl" className="font-ama-dhaba text-[clamp(1.75rem,8vw,2.125rem)] font-black leading-none text-brand-primary">
                اماں جی کا ڈھابہ
              </span>
            </Link>
            <p className="text-brand-dark/55 text-sm font-medium leading-relaxed max-w-sm">
              Pakistan&apos;s most loved premium desi food brand. From sizzling Karahi to golden Biryani — every bite tells a story of heritage and love.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-brand-dark/50 hover:text-brand-primary hover:border-brand-primary/30 hover:shadow-[0_5px_15px_rgba(248,114,5,0.15)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  {s.icon}
                </a>
              ))}
            </div>


          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-dark">
                <span className="w-5 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full" />
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link, idx) => (
                  <li key={`${title}-${idx}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-dark/55 hover:text-brand-primary font-medium transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-1 flex w-full flex-col justify-between gap-6 xl:flex-row xl:items-end lg:gap-8">
          {/* Contact Info */}

          <div className="mt-1 flex flex-col gap-3">
            <a href="https://wa.me/92341330336" className="flex items-center gap-3 text-sm text-brand-dark/60 hover:text-brand-primary transition-colors group font-medium">
              <span className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </span>
              +92 335 415 3368
            </a>
            <div className="flex items-start gap-3 text-sm text-brand-dark/60 font-medium">
              <span className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <span className="max-w-xl">464-Sir Handi Road, Near Gourmet bakers, first round about, Samnabad, Lahore</span>
            </div>
          </div>

          {/* Newsletter / Bottom CTA Section */}
          {/* <div className="border-t border-gray-100 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
              <h4 className="text-xl font-medium text-brand-dark tracking-tight mb-2">Subscribe to our newsletter</h4>
              <p className="text-brand-dark/50 text-sm font-medium">Get the latest offers, recipes and desi food stories delivered to your inbox weekly.</p>
            </div>

            <div className="w-full md:w-auto flex-1 md:max-w-md">
              <div className="flex items-center gap-0 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm focus-within:border-brand-primary focus-within:shadow-[0_0_0_3px_rgba(248,114,5,0.1)] transition-all">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-5 py-4 text-sm text-brand-dark/80 font-medium bg-transparent outline-none flex-1 placeholder:text-brand-dark/30"
                />
                <button className="px-6 py-4 bg-brand-primary text-white font-medium text-xs uppercase tracking-widest hover:bg-[#F87205] transition-colors">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
          <div className="relative flex flex-col items-center justify-between gap-4 border-t border-gray-100 py-3 sm:flex-row sm:items-end">



            {/* Right: Powered By + Links */}
            <div className="flex flex-col items-center sm:items-end gap-5">
              <a
                href="https://diginizam.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 transition-all duration-300 hover:opacity-80 active:scale-95"
              >
                <span className="text-[13px] font-medium text-gray-400 uppercase tracking-widest group-hover:text-[#0149EC] transition-colors duration-300">
                  POWERED BY
                </span>
                <div className="h-6 w-[2px] bg-gray-200 group-hover:bg-[#0149EC]/30 transition-colors duration-300"></div>
                <div className="relative h-10 w-40 sm:w-52">
                  <Image
                    src="/diginizam-logo.svg"
                    alt="DigiNizam"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </a>

              {/* <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                <Link href="/privacy" className="text-[11px] text-brand-dark/40 hover:text-brand-primary transition-colors font-medium uppercase tracking-widest">Privacy Policy</Link>
                <Link href="/terms" className="text-[11px] text-brand-dark/40 hover:text-brand-primary transition-colors font-medium uppercase tracking-widest">Terms</Link>
                <Link href="/contact" className="text-[11px] text-brand-dark/40 hover:text-brand-primary transition-colors font-medium uppercase tracking-widest">Contact</Link>
              </div> */}
            </div>


          </div>


        </div>

        <div className="mt-4 flex w-full items-center justify-center border-t border-gray-100 py-4">
          <p className="text-[10px] text-brand-dark/40 font-medium tracking-widest text-center">
            © {year} ZeeFood. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
