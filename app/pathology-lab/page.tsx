"use client";

import { useState } from "react";
import { Microscope, TestTube, Activity, Clock, Award, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "../componets/navbar";
import { Footer } from "../componets/footer";
import { TopHeader } from "../componets/top_header";
import { MainNavbar } from "../componets/MainNavbar";
import { TopNavbar } from "../componets/TopNavbar";

const pathologyServices = [
  {
    id: 1,
    title: "Complete Blood Count (CBC)",
    description: "Comprehensive analysis of blood cells for various conditions",
    price: "₹ 350",
    originalPrice: "₹ 500",
    duration: "2-4 hours",
    category: "Hematology",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  },
  {
    id: 2,
    title: "Lipid Profile",
    description: "Complete cholesterol and triglyceride analysis",
    price: "₹ 450",
    originalPrice: "₹ 650",
    duration: "4-6 hours",
    category: "Biochemistry",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  },
  {
    id: 3,
    title: "Liver Function Test (LFT)",
    description: "Comprehensive liver health assessment",
    price: "₹ 550",
    originalPrice: "₹ 800",
    duration: "6-8 hours",
    category: "Biochemistry",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  },
  {
    id: 4,
    title: "Kidney Function Test (KFT)",
    description: "Complete renal function analysis",
    price: "₹ 500",
    originalPrice: "₹ 750",
    duration: "4-6 hours",
    category: "Biochemistry",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  },
  {
    id: 5,
    title: "Thyroid Profile",
    description: "T3, T4, and TSH analysis for thyroid function",
    price: "₹ 600",
    originalPrice: "₹ 900",
    duration: "6-8 hours",
    category: "Endocrinology",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  },
  {
    id: 6,
    title: "Blood Sugar Test",
    description: "Fasting and postprandial glucose levels",
    price: "₹ 150",
    originalPrice: "₹ 250",
    duration: "1-2 hours",
    category: "Biochemistry",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  }
];

const labFeatures = [
  {
    icon: Award,
    title: "NABL Accredited",
    description: "Certified by National Accreditation Board for Testing and Calibration Laboratories"
  },
  {
    icon: Users,
    title: "Expert Pathologists",
    description: "Highly qualified and experienced medical professionals"
  },
  {
    icon: Clock,
    title: "Quick Reports",
    description: "Fast and accurate test results delivered on time"
  },
  {
    icon: Microscope,
    title: "Advanced Technology",
    description: "State-of-the-art equipment and modern diagnostic techniques"
  }
];

export default function PathologyLabPage() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleServices = 3;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
  };

  const maxStartIndex = Math.max(0, pathologyServices.length - visibleServices);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
            <TopNavbar />
            <MainNavbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 via-sky-100 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pathology Laboratory
            </h1>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced diagnostic services with state-of-the-art technology and expert medical professionals
            </p>
          </div>
        </div>
      </section>

      {/* Lab Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {labFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Our Pathology Services
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive range of pathology tests with accurate and reliable results
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${startIndex * (100 / visibleServices)}%)`
                }}
              >
                {pathologyServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                      <div className="aspect-[16/10] bg-gray-200">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                            {service.category}
                          </span>
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <Clock className="w-4 h-4" />
                            {service.duration}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-2xl font-bold text-orange-600">{service.price}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">{service.originalPrice}</span>
                          </div>
                        </div>
                        
                        <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
                          Book Test
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              aria-label="Previous services"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                bg-white border border-gray-200 rounded-full p-3 shadow-md
                transition-all duration-200 hover:bg-gray-50 hover:shadow-lg
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={handleNext}
              disabled={startIndex === maxStartIndex}
              aria-label="Next services"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                bg-white border border-gray-200 rounded-full p-3 shadow-md
                transition-all duration-200 hover:bg-gray-50 hover:shadow-lg
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Pathology Services?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Book your pathology tests online and get accurate results from our NABL accredited laboratory
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Book Appointment
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-orange-600 transition-colors font-medium">
              View All Tests
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
