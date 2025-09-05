// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JSX } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CompanyVerse - Your Labour Matters.",
  description: "Make informed decisions with CompanyVerse. We provide transparent, community-driven reputation scores for companies, based on real feedback. Your money, your voice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <div className="relative">
          <Footer />
        </div>
      </body>
    </html>
  );
}