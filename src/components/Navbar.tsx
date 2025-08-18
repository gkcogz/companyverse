// src/components/Navbar.tsx
import Link from 'next/link';
import Login from './Login';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-gray-200">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
          Company
          <span className="ml-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Verse
          </span>
        </Link>

        {/* Giriş Butonu Alanı */}
        <div className="flex items-center">
          <Login />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;