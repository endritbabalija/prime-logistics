"use client";

import React, { createContext, useContext, useRef, RefObject } from 'react';

interface ScrollContextType {
  servicesRef: RefObject<HTMLDivElement | null>;
  aboutRef: RefObject<HTMLDivElement | null>;
  contactRef: RefObject<HTMLDivElement | null>;
  routesRef: RefObject<HTMLDivElement | null>;
  trackingRef: RefObject<HTMLDivElement | null>;
  scrollToServices: () => void;
  scrollToAbout: () => void;
  scrollToContact: () => void;
  scrollToRoutes: () => void;
  scrollToTracking: () => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const routesRef = useRef<HTMLDivElement>(null);
  const trackingRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const elementRect = ref.current.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
      
      window.scrollTo({
        top: middle,
        behavior: 'smooth'
      });
    }
  };

  const scrollToServices = () => {
    scrollToSection(servicesRef);
  };

  const scrollToAbout = () => {
    scrollToSection(aboutRef);
  };

  const scrollToContact = () => {
    scrollToSection(contactRef);
  };

  const scrollToRoutes = () => {
    scrollToSection(routesRef);
  };

  const scrollToTracking = () => {
    scrollToSection(trackingRef);
  };

  return (
    <ScrollContext.Provider 
      value={{ 
        servicesRef, 
        aboutRef, 
        contactRef,
        routesRef,
        trackingRef,
        scrollToServices, 
        scrollToAbout, 
        scrollToContact,
        scrollToRoutes,
        scrollToTracking
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
} 