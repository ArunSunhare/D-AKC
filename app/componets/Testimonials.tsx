"use client";
import { ImageWithFallback } from "./figma/callbackimgs";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Rajesh Kumar, 45",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY1MzY3ODE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    feedback: "Outstanding CT scan experience! The radiologist explained everything clearly and the report was delivered within 24 hours. The staff was extremely professional and the equipment is top-notch. Highly recommend for all diagnostic needs!"
  },
  {
    name: "Priya Sharma, 38",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8MTc2NTM2NzgxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    feedback: "The home collection facility is a blessing! As a working mother, I really appreciate their punctual sample collection service. The pathologist was very gentle with my elderly mother. Reports are always accurate and delivered on time."
  },
  {
    name: "Dr. Amit Verma, 52",
    location: "Lucknow",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBkb2N0b3J8ZW58MXx8fHwxNzY1MzY3ODE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    feedback: "As a physician, I trust Hanuman Diagnostic Centre for my patients. Their pathology reports are highly accurate and the radiology team is exceptional. The ultrasound reports are detailed with proper clinical correlation. Excellent diagnostic facility!"
  },
  {
    name: "Sunita Reddy, 35",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzY1MzY3ODE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    feedback: "Amazing experience with their health packages! Got comprehensive tests done at reasonable rates. The X-ray and blood tests were handled efficiently. The online report access is so convenient. Best diagnostic centre in our area!"
  },
  {
    name: "Mahesh Gupta, 58",
    location: "Jaipur",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBzZW5pb3IlMjBzbWlsaW5nfGVufDF8fHx8MTc2NTM2NzgxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    feedback: "The nuclear medicine department is world-class. Dr. Saurabh Suman and his team handled my case with utmost care. The PET scan was done smoothly and reports were very detailed. Thank you for your excellent service!"
  },
  {
    name: "Anjali Patel, 42",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NTM2NzgxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    feedback: "Exceptional gynecology services! Dr. Santosh Kumari is very experienced and caring. The ultrasound was comfortable and the reports were comprehensive. The staff maintains proper hygiene and follows all protocols. Very satisfied!"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            CustomerTestimonials
          </h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-orange-600">
                <ImageWithFallback
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-blue-500 mb-1">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-orange-600 mb-4">
                {testimonials[currentIndex].location}
              </p>

              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 max-w-3xl leading-relaxed">
                {testimonials[currentIndex].feedback}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-orange-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
