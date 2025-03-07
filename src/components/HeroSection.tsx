"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useScroll } from '@/context/ScrollContext';

export default function HeroSection() {
  // Get the scrollToServices function from the ScrollContext
  const { scrollToServices } = useScroll();
  
  // State to track viewport height for mobile devices
  const [viewportHeight, setViewportHeight] = useState('100vh');

  // Effect to handle mobile viewport height issues
  useEffect(() => {
    // Function to update viewport height
    const updateViewportHeight = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };

    // Set initial height
    updateViewportHeight();

    // Update height on resize
    window.addEventListener('resize', updateViewportHeight);

    // Cleanup
    return () => window.removeEventListener('resize', updateViewportHeight);
  }, []);

  return (
    <section 
      className="relative bg-gray-900 w-full overflow-hidden"
      style={{ height: viewportHeight }}
    >
      {/* Dark background with uploaded image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/images/seb-creativo-3jG-UM8IZ40-unsplash.jpg" 
          alt="Logistics truck on mountain road"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div> {/* Overlay for better text visibility */}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between">
        {/* Top section with logo and navigation is in Navbar component */}
        
        {/* Main content - centered */}
        <div className="flex flex-col items-center justify-center text-center pt-24 pb-12 flex-1">
          <div>
            <p className="text-gray-300 uppercase tracking-wider text-sm">LOGISTIC</p>
            <h1 className="text-2xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-white mt-4">
              Transport<br />Ndërkombëtar
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
              Të plotë dhe parcial nga gjithë shtetet e Evropës drejt <br /> Kosovës dhe Shqipërisë si dhe anasjelltas
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            {/* <button className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors min-w-[150px]">
              Get Started
            </button> */}
            <button 
              className="px-8 py-3 bg-transparent border border-gray-500 text-white font-medium hover:border-white transition-colors min-w-[150px]"
              onClick={scrollToServices}
            >
              Shiko më shumë
            </button>
          </div>
        </div>
        
        {/* Bottom section with Best Offering and Free Consult */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-8">
          {/* Best Offering Section */}
          <div className="bg-black/0 p-4">
            <h3 className="text-white font-medium mb-4 text-lg">Kontakto tani</h3>
            <div className="flex items-center mb-3 border-b border-gray-500">
              <input 
                type="email" 
                placeholder="Put your email here" 
                className="bg-transparent text-white placeholder-gray-400 py-2 pr-10 w-full focus:outline-none"
              />
              <button className="text-white hover:text-blue-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-gray-300 text-sm">Për më shumë informata rreth cmimores, na kontaktoni lirëshem!</p>
            <p className="text-gray-300 text-sm mt-4">Në mund të ju ndihmojmë!</p>
          </div>
          
          {/* Free Consult Section */}
          <div className="bg-black/0 p-4">
            <h3 className="text-white font-medium mb-4 text-lg">Konsult falas</h3>
            <div className="flex items-center mb-3 border-b border-gray-500">
              <input 
                type="email" 
                placeholder="Put your email here" 
                className="bg-transparent text-white placeholder-gray-400 py-2 pr-10 w-full focus:outline-none"
              />
              <button className="text-white hover:text-blue-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-gray-300 text-sm">Ne ofrojmë konsultime falas për klientin tonë.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 