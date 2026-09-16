"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BANNERS = [
  "/zeefood Banner/20260804-120946.jpg",
  "/zeefood Banner/20260804-121003.jpg",
  "/zeefood Banner/20260804-121009.jpg",
  "/zeefood Banner/20260804-121018.jpg",
  "/zeefood Banner/20260804-121025.jpg",
  "/zeefood Banner/20260804-121030.jpg",
  "/zeefood Banner/20260804-121036.jpg",
  "/zeefood Banner/20260804-121042.jpg",
  "/zeefood Banner/20260804-121047.jpg",
  "/zeefood Banner/20260804-121053.jpg",
  "/zeefood Banner/20260804-121058.jpg",
];

export default function BannerModal({ onClose }: { onClose: () => void }) {
  const [bannerSrc, setBannerSrc] = useState<string>("");

  useEffect(() => {
    const key = "zeefood_banner_index";
    const current = parseInt(sessionStorage.getItem(key) || "0", 10);
    const next = (current + 1) % BANNERS.length;
    sessionStorage.setItem(key, String(next));
    setBannerSrc(BANNERS[current]);
  }, []);

  if (!bannerSrc) return null;

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Wrapper tightly wraps the image so button sits exactly on its corner */}
      <div
        className="relative animate-in zoom-in-95 duration-300 rounded-2xl shadow-2xl overflow-hidden"
        style={{ maxWidth: "640px", width: "100%", maxHeight: "600px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerSrc}
          alt="Zee Food Promotion"
          className="block w-full h-auto"
          style={{ maxHeight: "600px", objectFit: "contain" }}
        />

        {/* Close button — top-right corner ON the banner */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close banner"
          className="absolute top-3 right-3 z-10 grid place-items-center h-8 w-8 rounded-full bg-white shadow-lg border border-gray-200 transition-colors hover:bg-gray-100"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 11M11 1L1 11" stroke="#111111" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
