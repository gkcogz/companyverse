// src/components/Navbar.tsx
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-200">
        
        <Link href="/" className="flex items-center">
          <Image
            src="/images/cv-logo-1-png.png"
            alt="CompanyVerse Logo"
            width={40}
            height={40}
            className="h-10 w-10 mr-2"
            priority
          />
        </Link>

        <div className="flex items-center space-x-4">
          
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              aria-label="Main menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>

            {isMenuOpen && (
              // DEĞİŞİKLİK: "Blog" linki eklendi
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                <Link
                  href="/about"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About CompanyVerse
                </Link>
                <Link
                  href="/blog" // Yeni blog sayfasının yolu
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </div>
            )}
          </div>

          <Login />

        </div>
      </nav>
    </header>
  );
};

export default Navbar;