import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmsans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammed Huzaifa — Entrepreneur & AI Product Builder",
  description:
    "I start companies, build products, and write code. Usually all three at once. AI product development, full-stack engineering, workflow automation, and product strategy.",
  keywords: [
    "Mohammed Huzaifa",
    "AI Product Builder",
    "Entrepreneur",
    "Full-Stack Developer",
    "Next.js",
    "AI Agents",
    "Product Strategy",
  ],
  openGraph: {
    title: "Mohammed Huzaifa — Entrepreneur & AI Product Builder",
    description:
      "I start companies, build products, and write code. Usually all three at once.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${dmsans.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body className="grain min-h-full antialiased">
        <Preloader />
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
