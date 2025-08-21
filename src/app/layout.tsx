// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JSX } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CompanyVerse - Your Money, Your Voice.",
  description: "Real user ratings for companies worldwide.",
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
        {/*
          DEĞİŞİKLİK 1: 
          Tüm ana içeriği (ve logoyu) Footer'ın üzerine taşımak için 
          relative ve z-10 eklendi.
        */}
        <main className="flex-1 relative z-10">{children}</main>
        
        {/*
          DEĞİŞİKLİK 2:
          Footer'ın da bir katman bağlamına sahip olması için
          relative eklendi.
        */}
        <div className="relative">
          <Footer />
        </div>
      </body>
    </html>
  );
}