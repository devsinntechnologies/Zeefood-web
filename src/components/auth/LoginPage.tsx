"use client";

import { useState, useId } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const phoneInputId = useId();
  const emailInputId = useId();
  const rememberId = useId();
  

  const [state, setState] = useState({
    phone: "",
    email: "",
    remember: false,
    showEmail: false,
    phoneFocus: false,
    emailFocus: false,
  });

  const handleOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // OTP send logic placeholder
  };

  return (
    <main
      id="login-main"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F2F3F3 35%, #F2F3F3 65%, #FFFFFF 100%)" }}
    >
      {/* ── Background decorations ── */}
      <BgDecorations />
      <FloatingParticles />

      {/* ── Top nav strip ── */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-14">
        <Link href="/" className="flex items-center group" aria-label="Back to ZeeFood home">
          <div className="relative h-12 w-32 sm:h-14 sm:w-36">
            <Image src="/logo2.png" alt="ZeeFood Gallery" fill className="object-contain object-left drop-shadow-md transition-transform group-hover:scale-105" priority unoptimized />
          </div>
        </Link>
        <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:text-[#E71C07] transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </Link>
      </nav>

      {/* ── Main glassmorphism card — single column, compact ── */}
      <div
        id="login-card"
        className="relative z-20 w-full max-w-[420px] mx-4 rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.12),0_6px_20px_rgba(231, 28, 7,0.07)] border border-white/80"
        style={{
          background: "rgba(255,253,251,0.82)",
          backdropFilter: "blur(28px) saturate(1.5)",
          WebkitBackdropFilter: "blur(28px) saturate(1.5)",
        }}
      >
        {/* Inner highlight border */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" />

        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FB5C02] via-[#E71C07] to-[#E71C07]" />

        <div className="px-6 py-4">
          {/* Brand mark */}
          <div className="flex items-center justify-center mb-3">
            <div className="flex items-center gap-1.5 bg-white/90 border border-[#F2F3F3] rounded-full px-3 py-1 shadow-sm">
              <span className="text-[0.8rem]">🍽️</span>
              <span className="text-[0.6rem] font-bold text-[#E71C07] tracking-widest uppercase">Premium Experience</span>
            </div>
          </div>

          {/* Combined Form Content */}
          <div className="w-full flex flex-col gap-2.5">
            {/* Heading */}
            <div className="flex flex-col text-center">
              <h1 className="text-[1.75rem] font-black tracking-tight text-brand-dark leading-none mb-1">
                Welcome Back<span className="text-[#E71C07]">.</span>
              </h1>
              <p className="text-[0.85rem] text-brand-dark font-medium leading-snug">
                Sign in to continue your <span className="text-[#E71C07] font-semibold">premium</span> experience
              </p>
            </div>

            {/* Main form */}
            <form onSubmit={handleOtp} className="flex flex-col gap-2.5 mt-2">
              {/* Phone input */}
              <div className="flex flex-col gap-0.5">
                <label htmlFor={phoneInputId} className="text-[0.65rem] font-bold text-brand-dark uppercase tracking-widest">
                  Phone Number
                </label>
                <div className={`relative flex items-center bg-white/70 border-2 rounded-xl overflow-hidden transition-all duration-300 shadow-sm ${state.phoneFocus ? "border-[#E71C07] shadow-[0_0_0_4px_rgba(231, 28, 7,0.1)]" : "border-[#E5E7EB] hover:border-[#E71C07]"}`}>
                  <div className="flex items-center gap-1.5 pl-3 pr-2 py-2 border-r border-[#E5E7EB] bg-[#F2F3F3] shrink-0">
                    <span className="text-sm leading-none">🇵🇰</span>
                    <span className="text-xs font-black text-[#E71C07] tracking-wide">+92</span>
                  </div>
                  <input
                    id={phoneInputId}
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="3XX XXXXXXX"
                    value={state.phone}
                    onChange={(e) => setState((s) => ({ ...s, phone: e.target.value.replace(/\D/g, "") }))}
                    onFocus={() => setState((s) => ({ ...s, phoneFocus: true }))}
                    onBlur={() => setState((s) => ({ ...s, phoneFocus: false }))}
                    className="flex-1 px-3 py-2 bg-transparent text-brand-dark placeholder:text-brand-dark font-semibold text-sm outline-none"
                    aria-label="Phone number"
                    autoComplete="tel-national"
                  />
                </div>
              </div>

              {/* Optional email field */}
              {state.showEmail && (
                <div className="flex flex-col gap-0.5 animate-slide-down">
                  <label htmlFor={emailInputId} className="text-[0.65rem] font-bold text-brand-dark uppercase tracking-widest">
                    Email Address
                  </label>
                  <div className={`relative flex items-center bg-white/70 border-2 rounded-xl overflow-hidden transition-all duration-300 shadow-sm ${state.emailFocus ? "border-[#E71C07] shadow-[0_0_0_4px_rgba(231, 28, 7,0.1)]" : "border-[#E5E7EB] hover:border-[#E71C07]"}`}>
                    <div className="flex items-center pl-3 pr-2 py-2 border-r border-[#E5E7EB] bg-[#F2F3F3] shrink-0">
                      <svg className="w-4 h-4 text-[#E71C07]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      id={emailInputId}
                      type="email"
                      placeholder="you@example.com"
                      value={state.email}
                      onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                      onFocus={() => setState((s) => ({ ...s, emailFocus: true }))}
                      onBlur={() => setState((s) => ({ ...s, emailFocus: false }))}
                      className="flex-1 px-3 py-2 bg-transparent text-brand-dark placeholder:text-brand-dark font-semibold text-sm outline-none"
                      aria-label="Email address"
                      autoComplete="email"
                    />
                  </div>
                </div>
              )}

              {/* Remember me row */}
              <div className="flex items-center justify-between mt-1">
                <label htmlFor={rememberId} className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative w-4 h-4">
                    <input
                      id={rememberId}
                      type="checkbox"
                      checked={state.remember}
                      onChange={(e) => setState((s) => ({ ...s, remember: e.target.checked }))}
                      className="peer sr-only"
                    />
                    <div className="w-4 h-4 rounded border-2 border-[#E5E7EB] bg-white peer-checked:bg-[#E71C07] peer-checked:border-[#E71C07] transition-all duration-200 flex items-center justify-center shadow-sm group-hover:border-[#E71C07]">
                      {state.remember && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-[0.75rem] text-brand-dark font-medium group-hover:text-brand-dark transition-colors">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => setState((s) => ({ ...s, showEmail: !s.showEmail }))}
                  className="text-[0.75rem] font-semibold text-[#E71C07] hover:text-[#E71C07] transition-colors underline-offset-2 hover:underline"
                >
                  {state.showEmail ? "Use phone only" : "Use email instead"}
                </button>
              </div>

              {/* Primary CTA */}
              <button
                type="submit"
                id="otp-submit-btn"
                className="relative w-full py-2.5 mt-1 rounded-xl font-black text-white text-[0.9rem] tracking-wide overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(231, 28, 7,0.45)] shadow-[0_6px_20px_rgba(231, 28, 7,0.3)] bg-brand-primary hover:bg-brand-primary/90"
                aria-label="Send OTP to log in"
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] duration-700 ease-in-out" />
                <span className="relative flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Send OTP &amp; Login
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d8c8be] to-transparent" />
              <span className="text-[0.6rem] font-bold text-brand-dark uppercase tracking-widest px-1">
                or continue with
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d8c8be] to-transparent" />
            </div>

            {/* Social auth */}
            <div className="flex flex-col gap-2">
              <SocialButton
                id="google-login-btn"
                icon={
                  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                }
                label="Continue with Google"
              />
              <SocialButton
                id="apple-login-btn"
                icon={
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-brand-dark" fill="currentColor" aria-hidden="true">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.4.07 2.38.76 3.18.8 1.21-.24 2.37-.97 3.67-.84 1.62.19 2.84.91 3.63 2.3-3.21 1.98-2.46 5.85.48 7.13-.57 1.52-1.32 3.02-3 3.49zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                }
                label="Continue with Apple"
              />
            </div>

            {/* Terms */}
            <p className="text-center text-[0.65rem] text-brand-dark leading-relaxed mt-1">
              By continuing, you agree to ZeeFood&apos;s{" "}
              <Link href="/terms" className="text-[#E71C07] hover:underline font-semibold">Terms</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#E71C07] hover:underline font-semibold">Privacy</Link>.
            </p>
          </div>

          {/* Sign up nudge */}
          <p className="text-center text-[0.75rem] text-brand-dark mt-3 font-medium">
            New to ZeeFood?{" "}
            <Link href="/register" className="text-[#E71C07] font-black hover:underline underline-offset-2">
              Create a free account
            </Link>
          </p>
        </div>

        {/* Bottom trust strip */}
        <div className="border-t border-[#E5E7EB] bg-[#F2F3F3] px-6 py-2.5 flex items-center justify-center gap-5">
          <TrustBadge emoji="⭐" label="4.9 Rating" />
          <div className="w-px h-5 bg-[#E5E7EB]" />
          <TrustBadge emoji="🍽️" label="500+ Restaurants" />
          <div className="w-px h-5 bg-[#E5E7EB]" />
          <TrustBadge emoji="⚡" label="30 min" />
        </div>
      </div>

      {/* Bottom copyright */}
      <p className="absolute bottom-3 text-[0.68rem] text-brand-dark font-medium z-10">
        © 2026 ZeeFood · Premium Food Delivery
      </p>
    </main>
  );
}

function SocialButton({ id, icon, label }: { id: string; icon: React.ReactNode; label: string }) {
  return (
    <button
      id={id}
      type="button"
      className="group flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/80 border-2 border-[#E5E7EB] hover:border-[#E71C07] hover:bg-white text-brand-dark font-bold text-[0.8rem] transition-all duration-250 hover:shadow-[0_4px_18px_rgba(231, 28, 7,0.12)] hover:-translate-y-0.5 shadow-sm backdrop-blur-sm"
      aria-label={label}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function BgDecorations() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute top-[-10%] left-[-8%] w-[400px] h-[400px] rounded-full opacity-40" style={{ background: "radial-gradient(circle, rgba(231, 28, 7,0.20) 0%, rgba(231, 28, 7,0.08) 50%, transparent 70%)", filter: "blur(55px)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[-12%] right-[-5%] w-[440px] h-[440px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(231, 28, 7,0.22) 0%, rgba(231, 28, 7,0.06) 50%, transparent 70%)", filter: "blur(65px)" }} />
    </>
  );
}

function FloatingParticles() {
  const particles = [
    { top: "10%", left: "7%",  size: 5, delay: "0s",    dur: "6s",   color: "rgba(231, 28, 7,0.35)" },
    { top: "20%", left: "88%", size: 4, delay: "1s",    dur: "8s",   color: "rgba(231, 28, 7,0.45)" },
    { top: "72%", left: "5%",  size: 5, delay: "2s",    dur: "7s",   color: "rgba(231, 28, 7,0.22)" },
    { top: "78%", left: "90%", size: 6, delay: "0.5s",  dur: "9s",   color: "rgba(231, 28, 7,0.28)" },
    { top: "45%", left: "2%",  size: 3, delay: "3s",    dur: "6.5s", color: "rgba(231, 28, 7,0.18)" },
    { top: "6%",  left: "52%", size: 3, delay: "2.5s",  dur: "8.5s", color: "rgba(231, 28, 7,0.28)" },
  ];
  return (
    <>
      {particles.map((p, i) => (
        <div key={i} aria-hidden="true" className="pointer-events-none absolute rounded-full animate-float-particle" style={{ top: p.top, left: p.left, width: p.size, height: p.size, background: p.color, animationDelay: p.delay, animationDuration: p.dur, boxShadow: `0 0 ${p.size * 3}px ${p.color}` }} />
      ))}
    </>
  );
}

function TrustBadge({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm leading-none">{emoji}</span>
      <span className="text-[0.65rem] font-bold text-brand-dark whitespace-nowrap">{label}</span>
    </div>
  );
}
