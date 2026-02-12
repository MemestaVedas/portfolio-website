import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ShootingStarCursor from "@/components/ShootingStarCursor";
import { PageTransitionProvider } from "@/context/PageTransitionContext";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-body-stack",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  display: "swap",
});

const druk = localFont({
  src: "../../public/fonts/DrukWide-Heavy-Trial.otf",
  variable: "--font-druk-stack",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kushal | Systems-First Product Engineer",
  description: "Systems engineer with elite taste. Rust, C++, TypeScript, Tauri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} ${druk.variable} antialiased bg-electric-primary text-white-pure selection:bg-accent-lime selection:text-ink-pure`}
      >
        <PageTransitionProvider>
          <SmoothScroll>
            <ShootingStarCursor />
            <PageTransition />
            {children}
          </SmoothScroll>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
