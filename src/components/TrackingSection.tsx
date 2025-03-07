"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useScroll } from '@/context/ScrollContext';

export default function TrackingSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { trackingRef } = useScroll();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw dotted world map effect
    const dotSize = 2;
    const spacing = 20;
    const rows = Math.floor(canvas.height / spacing);
    const cols = Math.floor(canvas.width / spacing);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Create a pattern that resembles a world map
        // This is a simplified approach
        const x = j * spacing;
        const y = i * spacing;
        
        // Random dots to create a map-like pattern
        if (Math.random() > 0.6) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }, []);

  return (
    <section ref={trackingRef} className="py-16 md:py-24 bg-[#1A2235] text-white font-urbanist relative">
      {/* Background canvas */}
      <div className="absolute inset-0 overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side with title and stats */}
          <div>
            {/* Title */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-semibold text-white">Kush jemi ne?</h2>
              <div className="w-20 h-1 bg-red-500 mt-4"></div>
            </div>
            
            {/* Stats in 2x2 grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              <div className="flex flex-col">
                <div className="text-5xl md:text-7xl font-bold text-white-500">15,000</div>
                <div className="mt-2 text-lg text-white">Dërgesa Vjetore</div>
              </div>
              
              <div className="flex flex-col">
                <div className="text-5xl md:text-7xl font-bold text-white-500">22</div>
                <div className="mt-2 text-lg text-white">Vite Eksperiencë</div>
              </div>
              
              <div className="flex flex-col">
                <div className="text-5xl md:text-7xl font-bold text-white-500">3,000</div>
                <div className="mt-2 text-lg text-white">m2 Depo Doganore</div>
              </div>
              
              <div className="flex flex-col">
                <div className="text-5xl md:text-7xl font-bold text-white-500">50</div>
                <div className="mt-2 text-lg text-white">Mjete Transporti</div>
              </div>
            </div>
          </div>
          
          {/* Right side for photo */}
          <div className="hidden md:block">
            <div className="w-full h-full relative overflow-hidden">
              <Image 
                src="/images/kush-jemi-ne.jpg"
                alt="Kush jemi ne"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 