"use client";
import { WorldMap } from "@/components/ui/world-map";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function WorldMapDemo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render animations until client-side hydration is complete
  if (!mounted) {
    return (
      <div className="py-40 bg-white dark:bg-black w-full">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-bold text-xl md:text-4xl text-black dark:text-white">
            Remote <span className="text-neutral-400">Connectivity</span>
          </p>
          <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
            Break free from traditional boundaries. Work from anywhere, at the
            comfort of your own studio apartment. Perfect for Nomads and
            Travellers.
          </p>
        </div>
        <div className="w-full aspect-[2/1] bg-white dark:bg-black rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="py-40 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Remote{" "}
          <span className="text-neutral-400">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Break free from traditional boundaries. Work from anywhere, at the
          comfort of your own studio apartment. Perfect for Nomads and
          Travellers.
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: {
              lat: 42.6629,
              lng: 21.1655,
            }, // Kosovo (Pristina)
            end: {
              lat: 40.7128,
              lng: -74.006,
            }, // New York
          },
          {
            start: { lat: 42.6629, lng: 21.1655 }, // Kosovo (Pristina)
            end: { lat: 51.5074, lng: -0.1278 }, // London
          },
          {
            start: { lat: 42.6629, lng: 21.1655 }, // Kosovo (Pristina)
            end: { lat: 35.6895, lng: 139.6917 }, // Tokyo
          },
          {
            start: { lat: 42.6629, lng: 21.1655 }, // Kosovo (Pristina)
            end: { lat: -33.8688, lng: 151.2093 }, // Sydney
          },
          {
            start: { lat: 42.6629, lng: 21.1655 }, // Kosovo (Pristina)
            end: { lat: 55.7558, lng: 37.6173 }, // Moscow
          },
          {
            start: { lat: 42.6629, lng: 21.1655 }, // Kosovo (Pristina)
            end: { lat: -23.5505, lng: -46.6333 }, // São Paulo
          },
          {
            start: { lat: 42.6629, lng: 21.1655 }, // Kosovo (Pristina)
            end: { lat: 25.2048, lng: 55.2708 }, // Dubai
          },
          {
            start: { lat: 42.6629, lng: 21.1655 }, // Kosovo (Pristina)
            end: { lat: 1.3521, lng: 103.8198 }, // Singapore
          },
        ]}
      />
    </div>
  );
} 