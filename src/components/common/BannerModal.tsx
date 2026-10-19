"use client";

import { useEffect, useState } from "react";

const BANNERS = [
  "/zeefood Banner/1.png",
  "/zeefood Banner/2.png",
  "/zeefood Banner/3.png",
  "/zeefood Banner/4.png",
  "/zeefood Banner/5.png",
  "/zeefood Banner/6.png",
  "/zeefood Banner/7.png",
  "/zeefood Banner/img_v3_0215h_773a2118-fee7-4a2c-a9d7-d45fd5b9ebhu.jpg",
  "/zeefood Banner/img_v3_0215i_bbe0fdad-b5ad-476e-bdb2-9923e048fahu.jpg",
  "/zeefood Banner/img_v3_0215i_6e182fed-eefa-4693-b77c-d1a50251abhu.jpg",
];

export default function BannerModal({ onClose }: { onClose: () => void }) {
  const [bannerSrc, setBannerSrc] = useState<string>("");

  useEffect(() => {
    const key = "zeefood_banner_index";
    const saved = Number(sessionStorage.getItem(key) || "0");
    const current = Number.isSafeInteger(saved) && saved >= 0 ? saved % BANNERS.length : 0;
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
