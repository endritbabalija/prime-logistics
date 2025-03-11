"use client";

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useScroll } from '@/context/ScrollContext';
import { motion } from 'framer-motion';

type ServiceType = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function ServicesSection() {
  const { servicesRef, aboutRef, routesRef, scrollToTracking, calculatorRef } = useScroll();

  // Services data
  const services: ServiceType[] = [
    {
      id: "",
      title: "Transport Rrugor",
      description: "Transport rrugor me lidhje globale dhe efektivitet të lartë.",
      image: "/images/Transport-Rrugor.jpg"
    },
    {
      id: "",
      title: "Transport Detar",
      description: "Dërgesa detare të sigurta dhe me shpejtësi të konsiderueshme.",
      image: "/images/Transport-Detar.jpg"
    },
    {
      id: "",
      title: "Transport Ajror",
      description: "Shërbim ajror me shpejtësi dhe ekspertizë të veçantë.",
      image: "/images/Transport-ajror.jpg" // Using services-land.jpg as a fallback for services-air.jpg
    },
    {
      id: "",
      title: "Depo Doganore",
      description: "Shërbime të specializuara për magazinim dhe procedura doganore.",
      image: "/images/Depo-Doganore.jpg"
    },
    {
      id: "",
      title: "Sherbime te logjistikes",
      description: "Zgjidhje të integruara logjistike për optimizimin e zinxhirit të furnizimit.",
      image: "/images/Logjistik.jpg"
    },
    {
      id: "",
      title: "Shpedicion",
      description: "Shërbime profesionale të shpedicionit për procedura doganore dhe dokumentacion.",
      image: "/images/Shpedicion.jpg"
    }
  ];

  // State for input fields for shipping calculator
  const [weight, setWeight] = useState<number | ''>('');
  const [length, setLength] = useState<number | ''>('');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [destinationType, setDestinationType] = useState<string>('kosovo');
  const [transportType, setTransportType] = useState<string>('full');
  
  // State for calculated values
  const [dimensionalWeight, setDimensionalWeight] = useState<number | null>(null);
  const [billableWeight, setBillableWeight] = useState<number | null>(null);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // Function to reset all calculator fields
  const resetCalculator = () => {
    setWeight('');
    setLength('');
    setWidth('');
    setHeight('');
    setDestinationType('kosovo');
    setTransportType('full');
    setDimensionalWeight(null);
    setBillableWeight(null);
    setShippingCost(null);
    setCalculationError(null);
  };

  // Constants for calculation
  const DIM_DIVISOR = 5000; // Standard divisor for metric measurements
  
  // Base rates and fees (these would be adjusted based on your actual pricing)
  const rates = {
    kosovo: { baseFee: 5, ratePerKg: 0.5 },
    neighboring: { baseFee: 10, ratePerKg: 1 },
    international: { baseFee: 20, ratePerKg: 2 }
  };
  
  // Transport type multipliers
  const transportMultiplier = {
    full: 1,
    partial: 0.7 // Partial transport is 70% of full transport cost
  };

  // Calculate dimensional weight
  const calculateDimensionalWeight = (
    l = length, 
    w = width, 
    h = height, 
    wt = weight, 
    dest = destinationType, 
    trans = transportType
  ) => {
    // Reset error state
    setCalculationError(null);
    
    // Validate inputs
    if (!l || !w || !h) {
      setCalculationError("Ju lutemi vendosni të gjitha dimensionet (gjatësi, gjerësi, lartësi)");
      return;
    }
    
    if (!wt) {
      setCalculationError("Ju lutemi vendosni peshën");
      return;
    }
    
    // Ensure all values are positive
    if (Number(l) <= 0 || Number(w) <= 0 || Number(h) <= 0 || Number(wt) <= 0) {
      setCalculationError("Të gjitha matjet duhet të jenë më të mëdha se zero");
      return;
    }
    
    // Proceed with calculation
    const dimWeight = (Number(l) * Number(w) * Number(h)) / DIM_DIVISOR;
    setDimensionalWeight(parseFloat(dimWeight.toFixed(2)));
    
    // Calculate billable weight
    const billable = Math.max(Number(wt), dimWeight);
    setBillableWeight(parseFloat(billable.toFixed(2)));
    
    // Calculate shipping cost
    if (dest && trans) {
      const { baseFee, ratePerKg } = rates[dest as keyof typeof rates];
      const multiplier = transportMultiplier[trans as keyof typeof transportMultiplier];
      
      const cost = (baseFee + (billable * ratePerKg)) * multiplier;
      setShippingCost(parseFloat(cost.toFixed(2)));
    }
  };

  // State to track which services are currently visible
  const [startIndex, setStartIndex] = useState(0);
  const servicesPerPage = 3;
  const totalServices = services.length;
  
  // Calculate which services to display (sliding window of 3)
  const visibleServices = Array.from({ length: servicesPerPage }).map((_, i) => {
    const index = (startIndex + i) % totalServices;
    return services[index];
  });
  
  // Navigation functions - move by one card at a time
  const goToPreviousCard = () => {
    setStartIndex((prev) => (prev === 0 ? totalServices - 1 : prev - 1));
  };
  
  const goToNextCard = () => {
    setStartIndex((prev) => (prev + 1) % totalServices);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Content - Full width */}
        <div>
          {/* Services Section */}
          <div className="mb-20" ref={servicesRef}>
            <div className="flex items-center mb-6">
              <span className="text-gray-400 mr-2">—</span>
              <span className="text-gray-500 uppercase text-sm">Sherbimet Tona</span>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800">
              Transport nga Evropa në Kosovë/Shqipëri dhe anasjelltas.
              </h2>
              
              {/* Navigation Arrows */}
              <div className="flex space-x-3">
                <button 
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-blue-600 transition-colors"
                  aria-label="Previous slide"
                  onClick={goToPreviousCard}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-blue-600 transition-colors"
                  aria-label="Next slide"
                  onClick={goToNextCard}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleServices.map((service, index) => (
                <div key={`${startIndex}-${index}`} className="flex flex-col">
                  <div className="relative h-64 md:h-72 lg:h-80 mb-4 bg-gray-100 overflow-hidden">
                    <Image 
                      src={service.image}
                      alt={service.title}
                      width={800}
                      height={600}
                      priority={service.title === "Transport Detar"}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <span className="text-sm text-gray-500">{service.id}</span>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Story Section */}
          <div className="mb-20" ref={aboutRef}>
            <div className="flex items-center mb-6">
              <span className="text-gray-400 mr-2">—</span>
              <span className="text-gray-500 uppercase text-sm">Rreth nesh</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-8">
                Prime Logistics LLC<br />
                Partneri Juaj në Transport
                </h2>
                
                
                <div className="flex space-x-4 mb-8">
                  <button 
                    onClick={scrollToTracking}
                    className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition-colors"
                  >
                    See More
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">
                Që nga viti 2015, Prime Logistics LLC ka ofruar zgjidhje profesionale në transport dhe logjistikë, duke garantuar besueshmëri, shpejtësi dhe komunikim 24/7 me klientët tanë.
                </p>
                
                <p className="text-gray-600">
                Ne ofrojmë një gamë të plotë shërbimesh logjistike për të gjitha nevojat tuaja, përfshirë edhe dërgesat speciale.
                </p>
              </div>
              
              <div className="space-y-8">
                <p className="text-gray-600">
                Me përvojë në transportimin e mallrave me përmasa të mëdha dhe peshë të rëndë, si dhe me një rrjet global bashkëpunëtorësh, kemi mundësi t&apos;i dërgojmë në çdo destinacion.
                
                Ekipi ynë ndërkombëtar i ekspertëve në ngarkesa speciale njeh sfidat e këtyre dërgesave dhe është i gatshëm t&apos;ju mbështesë në çdo hap. <br /><br />Trajtimi i ngarkesave speciale kërkon një qasje tjetër nga kontejnerët standardë, prandaj ne ofrojmë zgjidhje të personalizuara për të siguruar cilësi dhe siguri maksimale në çdo dërgesë.
                </p>
                
                <div>
                  <p className="text-gray-600 mb-2">
                    Si partneri juaj logjistik, fokusi ynë është të optimizojmë proceset e transportit dhe të minimizojmë kohën e tranzitit, duke ofruar zgjidhje të përshtatura që përputhen me kërkesat specifike të secilit klient.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shipping Calculator Section */}
          <div className="mb-20" ref={calculatorRef}>
            <div className="flex items-center mb-6">
              <span className="text-gray-400 mr-2">—</span>
              <span className="text-gray-500 uppercase text-sm">Llogaritësi</span>
            </div>
            
            <div className="bg-white p-4 sm:p-6 border border-gray-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Llogarit Koston e Transportit
                </h2>
                
                {/* Reset Button */}
                <button
                  onClick={resetCalculator}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  Rivendos
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {/* Left side - Tracking Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Weight Input */}
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                      Pesha e Paketës (kg)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      min="0"
                      step="0.1"
                      value={weight}
                      onChange={(e) => {
                        const newWeight = e.target.value ? parseFloat(e.target.value) : '';
                        setWeight(newWeight);
                        calculateDimensionalWeight(length, width, height, newWeight, destinationType, transportType);
                      }}
                      className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Shkruani peshën në kg"
                    />
                  </div>
                  
                  {/* Length Input */}
                  <div>
                    <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
                      Gjatësia (cm)
                    </label>
                    <input
                      type="number"
                      id="length"
                      min="0"
                      step="0.1"
                      value={length}
                      onChange={(e) => {
                        const newLength = e.target.value ? parseFloat(e.target.value) : '';
                        setLength(newLength);
                        calculateDimensionalWeight(newLength, width, height, weight, destinationType, transportType);
                      }}
                      className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Shkruani gjatësinë në cm"
                    />
                  </div>
                  
                  {/* Width Input */}
                  <div>
                    <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
                      Gjerësia (cm)
                    </label>
                    <input
                      type="number"
                      id="width"
                      min="0"
                      step="0.1"
                      value={width}
                      onChange={(e) => {
                        const newWidth = e.target.value ? parseFloat(e.target.value) : '';
                        setWidth(newWidth);
                        calculateDimensionalWeight(length, newWidth, height, weight, destinationType, transportType);
                      }}
                      className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Shkruani gjerësinë në cm"
                    />
                  </div>
                  
                  {/* Height Input */}
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                      Lartësia (cm)
                    </label>
                    <input
                      type="number"
                      id="height"
                      min="0"
                      step="0.1"
                      value={height}
                      onChange={(e) => {
                        const newHeight = e.target.value ? parseFloat(e.target.value) : '';
                        setHeight(newHeight);
                        calculateDimensionalWeight(length, width, newHeight, weight, destinationType, transportType);
                      }}
                      className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Shkruani lartësinë në cm"
                    />
                  </div>
                  
                  {/* Destination Type */}
                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                      Lloji i Destinacionit
                    </label>
                    <select
                      id="destination"
                      value={destinationType}
                      onChange={(e) => {
                        const newDestination = e.target.value;
                        setDestinationType(newDestination);
                        calculateDimensionalWeight(length, width, height, weight, newDestination, transportType);
                      }}
                      className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="kosovo">Brenda Kosovës</option>
                      <option value="neighboring">Rajonet Fqinje</option>
                      <option value="international">Ndërkombëtar</option>
                    </select>
                  </div>
                  
                  {/* Transport Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lloji i Transportit
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-1">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="transportType"
                          value="full"
                          checked={transportType === 'full'}
                          onChange={() => {
                            setTransportType('full');
                            calculateDimensionalWeight(length, width, height, weight, destinationType, 'full');
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Transport i plotë</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="transportType"
                          value="partial"
                          checked={transportType === 'partial'}
                          onChange={() => {
                            setTransportType('partial');
                            calculateDimensionalWeight(length, width, height, weight, destinationType, 'partial');
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Transport parcial</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Results Display */}
                <div className="mt-6 p-4 bg-gray-50 border border-gray-300">
                  {calculationError ? (
                    <div className="text-red-500 text-sm mb-3">{calculationError}</div>
                  ) : null}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2">
                    <div>
                      <p className="text-sm text-gray-600">Pesha Dimensionale:</p>
                      <p className="text-base font-medium mt-1">{dimensionalWeight ? `${dimensionalWeight} kg` : '-'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Pesha e Faturueshme:</p>
                      <p className="text-base font-medium mt-1">{billableWeight ? `${billableWeight} kg` : '-'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Kosto e Parashikuar:</p>
                      <p className="text-xl font-bold text-blue-600 mt-1">
                        {shippingCost ? `€${shippingCost}` : '-'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* User Guidance */}
                <div className="mt-6 text-sm text-gray-500 space-y-3 p-4 border border-gray-300">
                  <p>
                    <strong>Si funksionon:</strong> Ne llogarisim kostot e transportit bazuar në peshën aktuale dhe peshën dimensionale (L×W×H÷5000).
                    Vlera më e lartë përdoret si pesha faturuese.
                  </p>
                  <p>
                    <strong>Llojet e Transportit:</strong> "Transport i plotë" do të thotë që dërgesa juaj ka një automjet të dedikuar vetëm për të, 
                    ndërsa "Transport parcial" do të thotë që pakoja juaj ndan hapësirën me dërgesa të tjera, duke rezultuar në kosto më të ulëta.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Routes Section */}
          <div ref={routesRef}>
            <div className="flex items-center mb-6">
              <span className="text-gray-400 mr-2">—</span>
              <span className="text-gray-500 uppercase text-sm">Linjat tona</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-8">
              Linjat e rregullta
            </h2>
            
            <p className="text-gray-700 mb-8 text-lg max-w-3xl">
              Ne mundohemi të lidhim biznesin tënd me gjithë botën, duke siguruar
              transport të rregullt, të sigurtë, të shpejtë dhe efikas sipas kërkesave dhe
              nevojave tuaja.
            </p>
            
            {/* Large image card */}
            <div className="mb-10 overflow-hidden shadow-md">
              <div className="relative h-[300px] w-full">
                <Image 
                  src="/images/linjat-tona.jpg"
                  alt="Linjat e rregullta"
                  width={1200}
                  height={300}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: '50% 65%' }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {/* Card 1: Kosovë-Regjion-Kosovë */}
              <div className="bg-white p-6 border border-gray-300 hover:border-gray-400 transition-colors">
                <div className="flex items-center justify-center mb-4 w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Kosovë-Regjion-Kosovë</h3>
                <p className="text-gray-600">4 herë në javë</p>
              </div>
              
              {/* Card 2: Kosovë-Evropë-Kosovë */}
              <div className="bg-white p-6 border border-gray-300 hover:border-gray-400 transition-colors">
                <div className="flex items-center justify-center mb-4 w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Kosovë-Evropë-Kosovë</h3>
                <p className="text-gray-600">2 herë në javë</p>
              </div>
              
              {/* Card 3: Azi-Kosovë-Azi */}
              <div className="bg-white p-6 border border-gray-300 hover:border-gray-400 transition-colors">
                <div className="flex items-center justify-center mb-4 w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Azi-Kosovë-Azi</h3>
                <p className="text-gray-600">2 herë në muaj</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 