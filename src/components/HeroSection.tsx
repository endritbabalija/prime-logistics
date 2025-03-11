"use client";

import { useState, useEffect } from 'react';
import { useScroll } from '@/context/ScrollContext';

export default function HeroSection() {
  // Get the scrollToServices function from the ScrollContext
  const { scrollToServices, scrollToCalculator } = useScroll();
  
  // State to track viewport height for mobile devices
  const [viewportHeight, setViewportHeight] = useState('90vh');

  // Effect to handle mobile viewport height issues
  useEffect(() => {
    // Function to update viewport height
    const updateViewportHeight = () => {
      // Calculate 90% of the viewport height
      setViewportHeight(`${window.innerHeight * 0.9}px`);
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
      {/* Video background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/videos/truck-in-traffic-on-highway-viaduct-bridge-view-fr-2023-11-27-05-29-47-utc (1).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40"></div> {/* Overlay for better text visibility */}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between">
        {/* Top section with logo and navigation is in Navbar component */}
        
        {/* Main content - centered */}
        <div className="flex flex-col items-center justify-center text-center pt-24 pb-12 flex-1">
          <div>
            <p className="text-gray-300 uppercase tracking-wider text-sm md:text-base">Import - Export</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-9xl font-bold leading-tight text-white mt-4">
              Transport<br />Ndërkombëtar
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
              Të plotë dhe parcial nga gjithë shtetet e Evropës drejt <br className="hidden sm:block" /> Kosovës dhe Shqipërisë si dhe anasjelltas
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
            <button 
              className="px-8 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors min-w-[150px]"
              onClick={scrollToCalculator}
            >
              Kalkulatori
            </button>
          </div>
        </div>
        
        {/* Removing the bottom section with email inputs */}
        {/* Adding some additional bottom margin to compensate for the removed section */}
        <div className="mb-8"></div>
      </div>
    </section>
  );
} 