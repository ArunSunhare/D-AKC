"use client";

import {
  TestTube,
  Activity,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const packages = [
  {
    name: "Total Care Checkup",
    badge: "NABL Certified",
    price: "₹ 3499",
    parameters: 87,
    reportTat: "Report TAT: 24 hours",
    includes: "138 Parameters Includes",
    bgColor: "bg-blue-100"
  },
  {
    name: "Senior Citizen Checkup - Male",
    badge: "NABL Certified",
    price: "₹ 2999",
    parameters: 95,
    reportTat: "Report TAT: 24 hours",
    includes: "95 Parameters Includes",
    bgColor: "bg-blue-50"
  },
  {
    name: "Senior Citizen Checkup - Female",
    badge: "NABL Certified",
    price: "₹ 4499",
    parameters: 105,
    reportTat: "Report TAT: 24 hours",
    includes: "105 Parameters Includes",
    bgColor: "bg-purple-50"
  },
  {
    name: "Full Body Checkup",
    badge: "NABL Certified",
    price: "₹ 2499",
    parameters: 72,
    reportTat: "Report TAT: 24 hours",
    includes: "72 Parameters Includes",
    bgColor: "bg-orange-50"
  }
];

export function HealthPackages() {
  const [startIndex, setStartIndex] = useState(0);
  const visiblePackages = 3;

  const handlePrev = () =>
    setStartIndex((prev) => Math.max(0, prev - 1));

  const handleNext = () =>
    setStartIndex((prev) =>
      Math.min(packages.length - visiblePackages, prev + 1)
    );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
         Popular Health Packages
        </h2>
        <div className="w-20 h-1 bg-red-600 mb-8"></div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  startIndex * (100 / visiblePackages)
                }%)`
              }}
            >
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  {/* Card (same style as your PopularTests) */}
                  <div
                    className={`${pkg.bgColor} border border-gray-200 rounded-lg p-6`}
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1">
                          {pkg.name}
                        </h3>

                        <span className="inline-block bg-white border border-red-200 text-red-600 px-3 py-1 text-xs rounded-full">
                          {pkg.badge}
                        </span>
                      </div>

                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Activity className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>

                    {/* Parameters Area */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <TestTube className="w-4 h-4" />
                        <span>{pkg.parameters} Parameters</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Activity className="w-4 h-4" />
                        <span>{pkg.reportTat}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Activity className="w-4 h-4" />
                        <span>{pkg.includes}</span>
                      </div>
                    </div>

                    {/* Price + Button */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="text-orange-600 font-semibold text-lg">
                        {pkg.price}
                      </div>

                      <button className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev Button */}
          {startIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 
              bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          )}

          {/* Next Button */}
          {startIndex < packages.length - visiblePackages && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 
              bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
