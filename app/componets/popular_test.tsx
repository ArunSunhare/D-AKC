"use client";

import {
  FlaskConical,
  TestTube,
  Activity,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const tests = [
  {
    slug: "whole-body-mrcp-scan",
    name: "Whole Body MRCP Scan",
    subtitle: "Scan | MRCP",
    price: "₹ 11999",
    originalPrice: "₹ 13999",
    parameters: 8,
    reportTat: "Report TAT: 36 hours",
    icon: Activity,
    bgColor: "bg-blue-100",
    description:
      "MRCP is a non-invasive MRI technique to visualize the biliary and pancreatic ducts.",
    alsoKnownAs: [
      "Whole Body MRCP Scan",
      "MRCP Abdomen",
      "MRCP with Contrast"
    ],
    specialization: "Gastroenterology & Liver Care"
  },
  {
    slug: "cbc-test",
    name: "CBC Test",
    subtitle: "Blood Test | CBC",
    price: "₹ 499",
    originalPrice: "₹ 699",
    parameters: 25,
    reportTat: "Report TAT: 24 hours",
    icon: TestTube,
    bgColor: "bg-blue-50",
    description:
      "CBC measures RBC, WBC, Hemoglobin, Platelets and detects infections or anemia.",
    alsoKnownAs: ["Complete Blood Count", "Full Hemogram"],
    specialization: "General Health Checkup"
  },
  {
    slug: "ultrasound-whole-abdomen",
    name: "Ultrasound Whole Abdomen",
    subtitle: "Imaging | Ultrasound",
    price: "₹ 999",
    originalPrice: "₹ 1299",
    parameters: 12,
    reportTat: "Report TAT: 24 hours",
    icon: Activity,
    bgColor: "bg-green-50",
    description:
      "Ultrasound evaluates liver, kidneys, pancreas, spleen and urinary bladder.",
    alsoKnownAs: ["USG Whole Abdomen"],
    specialization: "Radiology & Imaging"
  }
];

export function PopularTests() {
  const router = useRouter();
  const [startIndex, setStartIndex] = useState(0);
  const visibleTests = 3;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(tests.length - visibleTests, prev + 1)
    );
  };

  const handleBookClick = (test: any) => {
    router.push(`/tests/${test.slug}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Popular Tests
        </h2>
        <div className="w-20 h-1 bg-orange-600 mb-8"></div>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{
              transform: `translateX(-${startIndex * (100 / visibleTests)}%)`
            }}
          >
            {tests.map((test, index) => {
              const Icon = test.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-[48%] lg:w-[32%]"
                >
                  <div
                    className={`${test.bgColor} border rounded-lg p-6`}
                  >
                    <div className="flex justify-between mb-4">
                      <div>
                        <h3 className="text-gray-900">{test.name}</h3>
                        <p className="text-sm text-gray-600">
                          {test.subtitle}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {test.description}
                        </p>
                      </div>
                      <div className="bg-white p-2 rounded-lg">
                        <Icon className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <TestTube className="w-4 h-4" />
                        {test.parameters} Parameters
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        {test.reportTat}
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t pt-3">
                      <div className="text-orange-600 text-lg font-semibold">
                        {test.price}
                      </div>
                      <button
                        onClick={() => handleBookClick(test)}
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                      >
                        KNOW MORE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {startIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronLeft />
            </button>
          )}

          {startIndex < tests.length - visibleTests && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
