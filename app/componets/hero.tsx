"use client";

import { Search, Upload } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-gray-700 to-gray-600 py-16 overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/assets/hero.jpg"
        
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          
          <h1 className="text-white mb-2 text-4xl font-bold">
            Experience Care
          </h1>

          <p className="text-white/90 mb-8 text-lg">
            Near You, Health Checkups and Genetic Test
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-700 mb-4">
              Can help you with right test responsive & Lab Contact!
            </p>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for tests, packages..."
                  className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
                />
              </div>

              <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>

            <div className="mt-4">
              {/* future content */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
