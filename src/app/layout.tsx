import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/TuGOUUFxWphYQ6YI6q9Xp61FQzxDRKmzr1lWfxk.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/ieVn2YZDLWuGJpnzaiwFXS9tYtpd59A.woff2",
      weight: "300 900",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZeeFood Premium",
  description: "Premium food delivery experience.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};


import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LocationModal from "@/components/common/LocationModal";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { SelfOrderProvider } from "@/context/SelfOrderContext";
import ReduxProvider from "@/components/common/ReduxProvider";
import PageTransition from "@/components/common/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`${poppins.className} min-h-full flex flex-col`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <LanguageProvider>
            <CartProvider>
              <SelfOrderProvider>
                <LocationModal />
                <Navbar />
                <main className="flex-grow overflow-x-hidden">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </SelfOrderProvider>
            </CartProvider>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
