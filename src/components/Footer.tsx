// src/components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 mt-20 bg-white">
      <div className="container mx-auto px-6 py-8 text-center text-gray-500">
        {/* Yeni eklenen linkler alanı */}
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/about" className="text-sm hover:text-gray-800 hover:underline transition-colors">
            About
          </Link>
          {/* Gelecekte buraya "Contact", "Privacy Policy" gibi linkler de eklenebilir */}
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} CompanyVerse. All rights reserved.</p>
        <p className="text-xs mt-2 text-gray-400">Your Money, Your Voice.</p>
      </div>
    </footer>
  );
};

export default Footer;