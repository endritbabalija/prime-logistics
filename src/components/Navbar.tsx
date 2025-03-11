"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useScroll } from '@/context/ScrollContext';

export default function Navbar() {
  const { scrollToServices, scrollToAbout, scrollToContact } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClick = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center py-6 px-4 md:px-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl text-white">Prime Logistics</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="font-medium text-white hover:text-blue-300 transition-colors">
            Ballina
          </Link>
          <button 
            onClick={scrollToServices}
            className="font-medium text-white hover:text-blue-300 transition-colors"
          >
            Sherbimet
          </button>
          <button 
            onClick={scrollToAbout}
            className="font-medium text-white hover:text-blue-300 transition-colors"
          >
            Rreth nesh
          </button>
          <button 
            onClick={scrollToContact}
            className="font-medium text-white hover:text-blue-300 transition-colors"
          >
            Kontakti
          </button>
        </div>
        
        <div className="hidden md:block">
          <button 
            onClick={scrollToContact}
            className="px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Kontakto tani
          </button>
        </div>
        
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-white"
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/80 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link 
              href="/" 
              className="block font-medium text-white hover:text-blue-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ballina
            </Link>
            <button 
              onClick={() => handleMobileMenuClick(scrollToServices)}
              className="block w-full text-left font-medium text-white hover:text-blue-300 transition-colors py-2"
            >
              Sherbimet
            </button>
            <button 
              onClick={() => handleMobileMenuClick(scrollToAbout)}
              className="block w-full text-left font-medium text-white hover:text-blue-300 transition-colors py-2"
            >
              Rreth nesh
            </button>
            <button 
              onClick={() => handleMobileMenuClick(scrollToContact)}
              className="block w-full text-left font-medium text-white hover:text-blue-300 transition-colors py-2"
            >
              Kontakti
            </button>
          </div>
        </div>
      )}
    </nav>
  );
} 