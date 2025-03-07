"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useScroll } from '@/context/ScrollContext';

type ServiceType = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function ServicesSection() {
  const { servicesRef, aboutRef, routesRef, scrollToServices, scrollToAbout, scrollToRoutes, scrollToTracking } = useScroll();

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
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Sidebar Navigation - Vertical on the left */}
          <div className="md:w-1/4 lg:w-1/5">
            <nav className="flex flex-col space-y-8">
              <button 
                className="text-left py-2 px-4 transition-colors text-blue-600 font-medium border border-blue-600"
                onClick={scrollToServices}
              >
                Sherbimet tona
              </button>
              <button 
                className="text-left py-2 px-4 transition-colors text-gray-600 hover:text-blue-600"
                onClick={scrollToAbout}
              >
                Rreth nesh
              </button>
              <button 
                className="text-left py-2 px-4 transition-colors text-gray-600 hover:text-blue-600"
                onClick={scrollToRoutes}
              >
                Linjat e rregullta
              </button>
            </nav>
          </div>
          
          {/* Main Content - All sections aligned on the right */}
          <div className="md:w-3/4 lg:w-4/5">
            {/* Services Section */}
            <div className="mb-20" ref={servicesRef}>
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
                    <div className="relative h-64 md:h-72 lg:h-80 mb-4 bg-gray-100">
                      <Image 
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
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
                    {/* <button className="text-gray-700 px-6 py-3"> */}
                      {/* Discover More */}
                    {/* </button> */}
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
                  Me përvojë në transportimin e mallrave me përmasa të mëdha dhe peshë të rëndë, si dhe me një rrjet global bashkëpunëtorësh, kemi mundësi t'i dërgojmë në çdo destinacion.
                  
                  Ekipi ynë ndërkombëtar i ekspertëve në ngarkesa speciale njeh sfidat e këtyre dërgesave dhe është i gatshëm t'ju mbështesë në çdo hap. <br /><br />Trajtimi i ngarkesave speciale kërkon një qasje tjetër nga kontejnerët standardë, prandaj ne ofrojmë zgjidhje të personalizuara për të siguruar cilësi dhe siguri maksimale në çdo dërgesë.
                  </p>
                  
                  <div>
                    <p className="text-gray-600 mb-2">
                      Si partneri juaj logjistik, fokusi ynë është të optimizojmë proceset e transportit dhe të minimizojmë kohën e tranzitit, duke ofruar zgjidhje të përshtatura që përputhen me kërkesat specifike të secilit klient.
                    </p>
                    {/* <a href="#" className="text-blue-600">Read more</a> */}
                  </div>
                </div>
              </div>
            </div>
            
            {/* About Section */}
            <div ref={routesRef}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Photo on the left */}
                <div className="relative h-80 md:h-full">
                  <Image 
                    src="/images/linjat-e-rregullta.jpg"
                    alt="Linjat e rregullta"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Text content on the right */}
                <div className="text-right">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-8">
                    Linjat e rregullta
                  </h2>
                  
                  <p className="text-gray-700 mb-8 text-lg">
                    Ne mundohemi të lidhim biznesin tënd me gjithë botën, duke siguruar
                    transport të rregullt, të sigurtë, të shpejtë dhe efikas sipas kërkesave dhe
                    nevojave tuaja.
                  </p>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Kosovë-Regjion-Kosovë</h3>
                      <p className="text-gray-600">4 herë në javë</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Kosovë-Evropë-Kosovë</h3>
                      <p className="text-gray-600">2 herë në javë</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Azi-Kosovë-Azi</h3>
                      <p className="text-gray-600">2 herë në muaj</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 