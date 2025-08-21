// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Searchbar from '@/components/Searchbar';

export default function HomePage() {
  return (
    // DEĞİŞİKLİK: Arama sonuçlarının düzgün görüntülenmesi için "overflow-hidden" kaldırıldı.
    <div className="relative bg-white pt-24 sm:pt-32">

      <div className="relative flex flex-col items-center justify-center text-center px-4">
        <div className="w-full max-w-3xl pb-32">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Company
            <span className="ml-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Verse
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Share what you think about companies. Your voice matters.
          </p>

          <div className="mt-10">
            <Searchbar />
          </div>

          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link
              href="/companies"
              className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              Or browse all companies &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-10 w-full max-w-[150px] sm:max-w-[180px] pointer-events-none">
        <Image
          src="/images/cv-logo-2-png.png"
          alt="CompanyVerse Logo Illustration"
          width={300}
          height={270}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}