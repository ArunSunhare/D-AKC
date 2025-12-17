"use client";
import { ImageWithFallback } from "./figma/callbackimgs";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Rajesh Kumar, 45",
    location: "Delhi",
    //image: "https://images.unsplash.com/photo-1762838105891-81bdd36ec44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzZW5pb3IlMjBtYW58ZW58MXx8fHwxNzY1MzY3ODE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    feedback: "Reports provided in a very impeccable and focussed manner. Really appreciate this tremendous value from the diagnostic centre. The staff is very professional and the reports are always on time. Highly recommended!"
  },
  {
    name: "Priya Sharma, 38",
    location: "Mumbai",
   // image: "https://images.unsplash.com/photo-1624077292049-3ff1417810de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTI4NTA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    feedback: "Excellent service! The home collection facility is so convenient and the technicians are very courteous. The reports are detailed and easy to understand. Thank you for making healthcare accessible!"
  },
  {
    name: "Kamlesh Asani, 52",
    location: "Lucknow",
   // image: "https://images.unsplash.com/photo-1758691463626-0ab959babe00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBhdGllbnR8ZW58MXx8fHwxNzY1MzY3ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    feedback: "Reports provided in a very impeccable and focussed manner. Really appreciate this tremendous value add from the diagnostic centre. Really appreciate this tremendous value add wishing your team all the very best in this extremely noble service!"
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
          <h2 className="text-gray-900 mb-2">
            Customer <span className="text-orange-600">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-orange-600">
                <ImageWithFallback
                //   src={testimonials[currentIndex].image}
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
