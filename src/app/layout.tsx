// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JSX } from "react"; // JSX tipini import etmek iyi bir pratiktir.

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CompanyVerse - Your Money, Your Voice.",
  description: "Real user ratings for companies worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element { // Fonksiyonun bir JSX elementi döndürdüğü belirtildi.
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}