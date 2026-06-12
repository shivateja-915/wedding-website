import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eternal Frames — Luxury Wedding Photography | Hyderabad",
  description:
    "Award-winning cinematic wedding photography in Hyderabad and beyond. Every love story deserves to be timeless. Book your consultation today.",
  keywords: [
    "wedding photography",
    "Hyderabad wedding photographer",
    "luxury wedding photography",
    "cinematic wedding films",
    "pre-wedding photography",
    "reception photography",
  ],
  openGraph: {
    title: "Eternal Frames — Luxury Wedding Photography",
    description: "Capturing love stories with cinematic elegance. Serving Hyderabad & Beyond.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eternal Frames — Luxury Wedding Photography",
    description: "Capturing love stories with cinematic elegance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${inter.variable}`}>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
