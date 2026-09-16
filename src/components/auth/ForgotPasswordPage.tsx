"use client";

import { useState, useId } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const inputId = useId();

  const [state, setState] = useState({
    identifier: "",
    inputFocus: false,
    isSubmitted: false,
  });

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setState(s => ({ ...s, isSubmitted: true }));
  };

  return (
    <main
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F2F3F3 35%, #F2F3F3 65%, #FFFFFF 100%)" }}
    >
      <BgDecorations />
      <FloatingParticles />

      {/* Top nav strip */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-14">
        <Link href="/" className="flex items-center group" aria-label="Back to ZeeFood home">
          <div className="relative h-12 w-32 sm:h-14 sm:w-36">
            <Image src="/logo2.png" alt="ZeeFood Gallery" fill className="object-contain object-left drop-shadow-md transition-transform group-hover:scale-105" priority unoptimized />
          </div>
        </Link>
        <Link href="/login" className="flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:text-[#E71C07] transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to login
        </Link>
      </nav>

      {/* Main glassmorphism card */}
      <div
        className="relative z-20 w-full max-w-[420px] mx-4 rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.12),0_6px_20px_rgba(231, 28, 7,0.07)] border border-white/80"
        style={{
          background: "rgba(255,253,251,0.82)",
          backdropFilter: "blur(28px) saturate(1.5)",
          WebkitBackdropFilter: "blur(28px) saturate(1.5)",
        }}
      >
        <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" />
        <div className="h-1 w-full bg-gradient-to-r from-[#FB5C02] via-[#E71C07] to-[#E71C07]" />

        <div className="px-6 py-6">
          <div className="w-full flex flex-col gap-4">
            
            {!state.isSubmitted ? (
              <>
                {/* Heading */}
                <div className="flex flex-col text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F2F3F3] border border-[#F2F3F3] flex items-center justify-center mx-auto mb-3 text-xl">
                    🔐
                  </div>
                  <h1 className="text-[1.6rem] font-black tracking-tight text-brand-dark leading-none mb-2">
                    Forgot Password<span className="text-[#E71C07]">?</span>
                  </h1>
                  <p className="text-[0.85rem] text-brand-dark font-medium leading-snug px-2">
                    No worries! Enter your phone number or email and we&apos;ll send you recovery instructions.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleReset} className="flex flex-col gap-4 mt-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor={inputId} className="text-[0.65rem] font-bold text-brand-dark uppercase tracking-widest pl-1">
                      Phone or Email
                    </label>
                    <div className={`relative flex items-center bg-white/70 border-2 rounded-xl overflow-hidden transition-all duration-300 shadow-sm ${state.inputFocus ? "border-[#E71C07] shadow-[0_0_0_4px_rgba(231, 28, 7,0.1)]" : "border-[#E5E7EB] hover:border-[#E71C07]"}`}>
                      <div className="flex items-center pl-3 pr-2 py-3 border-r border-[#E5E7EB] bg-[#F2F3F3] shrink-0">
                        <svg className="w-4 h-4 text-[#E71C07]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        id={inputId}
                        type="text"
                        placeholder="03XX XXXXXXX or Email"
                        value={state.identifier}
                        onChange={(e) => setState((s) => ({ ...s, identifier: e.target.value }))}
                        onFocus={() => setState((s) => ({ ...s, inputFocus: true }))}
                        onBlur={() => setState((s) => ({ ...s, inputFocus: false }))}
                        className="flex-1 px-3 py-2.5 bg-transparent text-brand-dark placeholder:text-brand-dark font-semibold text-sm outline-none"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="relative w-full py-3 mt-1 rounded-xl font-black text-white text-[0.9rem] tracking-wide overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(231, 28, 7,0.45)] shadow-[0_6px_20px_rgba(231, 28, 7,0.3)] bg-brand-primary hover:bg-brand-primary/90"
                  >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] duration-700 ease-in-out" />
                    <span className="relative flex items-center justify-center gap-2">
                      Send Instructions
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col text-center py-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#ecfdf3] border border-[#a6f4c5] flex items-center justify-center mx-auto mb-4 text-2xl">
                  ✨
                </div>
                <h2 className="text-[1.5rem] font-black tracking-tight text-brand-dark mb-2">Check Your Device</h2>
                <p className="text-[0.85rem] text-brand-dark font-medium leading-relaxed px-4 mb-6">
                  We&apos;ve sent recovery instructions to <br/><span className="font-bold text-[#E71C07]">{state.identifier}</span>
                </p>
                <Link href="/login" className="font-bold text-brand-dark hover:text-[#E71C07] transition-colors underline underline-offset-4">
                  Return to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
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
    { top: "15%", left: "12%", size: 4, delay: "0s", dur: "7s", color: "rgba(231, 28, 7,0.3)" },
    { top: "80%", left: "85%", size: 5, delay: "1s", dur: "6s", color: "rgba(231, 28, 7,0.35)" },
  ];
  return (
    <>
      {particles.map((p, i) => (
        <div key={i} aria-hidden="true" className="pointer-events-none absolute rounded-full animate-float-particle" style={{ top: p.top, left: p.left, width: p.size, height: p.size, background: p.color, animationDelay: p.delay, animationDuration: p.dur, boxShadow: `0 0 ${p.size * 3}px ${p.color}` }} />
      ))}
    </>
  );
}
