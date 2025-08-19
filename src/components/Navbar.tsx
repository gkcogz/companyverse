// src/components/Navbar.tsx
 import Link from 'next/link';
 import Image from 'next/image';
 import Login from './Login';
 
 const Navbar = () => {
   return (
     <header className="fixed top-0 left-0 w-full z-50">
       <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-gray-200">
         
         {/* Logo ve Metin Yan Yana */}
         <Link href="/" className="flex items-center">
           <Image
             src="/images/cv-logo-1-png.png"
             alt="CompanyVerse Logo"
             width={40} // Logoyu biraz büyüttük
             height={40}
             className="h-10 w-10 mr-2" // Boyut ve sağ boşluk
             priority
           />
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