// src/components/Footer.tsx

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-700/20 mt-20">
      <div className="container mx-auto px-6 py-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} CompanyVerse. All rights reserved.</p>
        <p className="text-sm mt-2">Your Money, Your Voice.</p>
      </div>
    </footer>
  );
};

export default Footer;