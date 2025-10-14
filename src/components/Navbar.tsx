'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Login from './Login';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className="container mx-auto px-6 py-3 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-200"
        aria-label="Main"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="CompanyVerse Home">
          <Image
            src="/images/cv-logo-1-png.png"
            alt="CompanyVerse Logo"
            width={40}
            height={40}
            className="h-10 w-10 mr-2"
            priority
          />
          <span className="font-semibold text-gray-800 text-lg">CompanyVerse</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Dropdown Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-label="Open menu"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>

            {isMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50"
                role="menu"
                aria-orientation="vertical"
              >
                {/* Core Pages */}
                <Link
                  href="/about"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  About 
                </Link>

                <Link
                  href="/companies"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  Companies
                </Link>

                {/* Reviews Section */}
                <div className="border-t border-gray-100 my-1" />
                <span className="block px-4 py-2 text-sm font-semibold text-gray-900">
                  Reviews
                </span>
                <Link
                  href="/reviews/veeva"
                  className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  Veeva Review
                </Link>
                <Link
                  href="/reviews/mckinsey"
                  className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  McKinsey Review
                </Link>

                {/* Resources Section */}
                <div className="border-t border-gray-100 my-1" />
                <span className="block px-4 py-2 text-sm font-semibold text-gray-900">
                  Resources
                </span>
                <Link
                  href="/resources/freelancer-tax-guide-2026"
                  className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  Freelancer Tax Guide 2026
                </Link>

                {/* Blog */}
                <div className="border-t border-gray-100 my-1" />
                <Link
                  href="/blog"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  Blog
                </Link>
              </div>
            )}
          </div>

          {/* Auth */}
          <Login />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
