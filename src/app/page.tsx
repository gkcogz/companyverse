// src/app/page.tsx
import Link from 'next/link';
import Searchbar from '@/components/Searchbar';

export default function HomePage() {
  return (
    // Karşılama alanını kendi bölümü içine alıyoruz.
    // Dıştaki div'e dikey padding (py-24) ekleyerek içeriğin ferah görünmesini sağlıyoruz.
    <div className="relative bg-white py-24 sm:py-32">
      {/* Üstte hafif bir gradient efekti için */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-gray-50 to-white"></div>
      
      {/* min-h-[...] class'ı kaldırıldı çünkü artık layout.tsx footer'ı doğru şekilde yönetiyor.
        İçeriğin dikeyde ortalanması için flex ve justify-center yeterlidir.
      */}
      <div className="relative flex flex-col items-center justify-center text-center px-4">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Company
            <span className="ml-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Verse
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Read and share your experiences with companies. Your voice matters.
          </p>
          
          <div className="mt-10">
            <Searchbar />
          </div>

          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link
              href="/airlines"
              className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              Or browse all airlines &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}