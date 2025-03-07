"use client";

import { useState, useEffect } from 'react';
import { WorldMapDemo } from '@/components/ui/demo';

const ShippingCalculator = () => {
  // State for input fields
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
  useEffect(() => {
    if (length && width && height) {
      const dimWeight = (Number(length) * Number(width) * Number(height)) / DIM_DIVISOR;
      setDimensionalWeight(parseFloat(dimWeight.toFixed(2)));
    } else {
      setDimensionalWeight(null);
    }
  }, [length, width, height]);

  // Calculate billable weight
  useEffect(() => {
    if (weight && dimensionalWeight) {
      setBillableWeight(Math.max(Number(weight), dimensionalWeight));
    } else {
      setBillableWeight(null);
    }
  }, [weight, dimensionalWeight]);

  // Calculate shipping cost
  useEffect(() => {
    if (billableWeight && destinationType && transportType && rates && transportMultiplier) {
      const { baseFee, ratePerKg } = rates[destinationType as keyof typeof rates];
      const multiplier = transportMultiplier[transportType as keyof typeof transportMultiplier];
      
      const cost = (baseFee + (billableWeight * ratePerKg)) * multiplier;
      setShippingCost(parseFloat(cost.toFixed(2)));
    } else {
      setShippingCost(null);
    }
  }, [billableWeight, destinationType, transportType, rates, transportMultiplier]);

  return (
    <section id="shipping-calculator" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Shipping Cost Calculator</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* World Map Demo Component */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <WorldMapDemo />
          </div>
          
          {/* Calculator Component */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weight Input */}
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Package Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  min="0"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : '')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter weight in kg"
                />
              </div>
              
              {/* Dimensions Inputs */}
              <div>
                <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
                  Length (cm)
                </label>
                <input
                  type="number"
                  id="length"
                  min="0"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(e.target.value ? parseFloat(e.target.value) : '')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter length in cm"
                />
              </div>
              
              <div>
                <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
                  Width (cm)
                </label>
                <input
                  type="number"
                  id="width"
                  min="0"
                  step="0.1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value ? parseFloat(e.target.value) : '')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter width in cm"
                />
              </div>
              
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  min="0"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value ? parseFloat(e.target.value) : '')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter height in cm"
                />
              </div>
              
              {/* Destination Type */}
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                  Destination Type
                </label>
                <select
                  id="destination"
                  value={destinationType}
                  onChange={(e) => setDestinationType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="kosovo">Within Kosovo</option>
                  <option value="neighboring">Neighboring Regions</option>
                  <option value="international">International</option>
                </select>
              </div>
              
              {/* Transport Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transport Type
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="transportType"
                      value="full"
                      checked={transportType === 'full'}
                      onChange={() => setTransportType('full')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Transport të plotë</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="transportType"
                      value="partial"
                      checked={transportType === 'partial'}
                      onChange={() => setTransportType('partial')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Transport parcial</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Results Display */}
            <div className="mt-8 p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Calculation Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Dimensional Weight:</p>
                  <p className="font-medium">{dimensionalWeight ? `${dimensionalWeight} kg` : '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Billable Weight:</p>
                  <p className="font-medium">{billableWeight ? `${billableWeight} kg` : '-'}</p>
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Estimated Shipping Cost:</p>
                  <p className="text-xl font-bold text-blue-600">
                    {shippingCost ? `€${shippingCost}` : '-'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* User Guidance */}
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">
                <strong>How it works:</strong> We calculate shipping costs based on both actual weight and dimensional weight (L×W×H÷5000).
                The higher value is used as the billable weight.
              </p>
              <p>
                <strong>Transport types:</strong> &quot;Transport të plotë&quot; (full transport) means dedicated shipping for your package, 
                while &quot;Transport parcial&quot; (partial transport) means your package shares space with others, resulting in lower costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingCalculator; 