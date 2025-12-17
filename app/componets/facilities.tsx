"use client";
import { ImageWithFallback } from "./figma/callbackimgs";

const facilities = [
  {
    name: "Pathology Lab",
    image: "https://images.unsplash.com/photo-1630959299388-6e983fed7b98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRob2xvZ3klMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc2NTM2NTc1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "CT Scan",
    image: "https://images.unsplash.com/photo-1587010580103-fd86b8ea14ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY3QlMjBzY2FuJTIwbWFjaGluZXxlbnwxfHx8fDE3NjUzNjU3NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "X-Ray",
    image: "https://images.unsplash.com/photo-1587010580103-fd86b8ea14ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHh4cmF5JTIwbWVkaWNhbCUyMGltYWdpbmd8ZW58MXx8fHwxNzY1MzY1NzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "Ultrasound",
    image: "https://images.unsplash.com/photo-1630531210902-0673fd470570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bHRyYXNvdW5kJTIwbWVkaWNhbHxlbnwxfHx8fDE3NjUzNjU3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function Facilities() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ⭐ Updated Heading with Highlight */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Facilities
        </h2>
        <div className="w-20 h-1 bg-red-600 mb-8"></div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="aspect-[4/3] relative">
                <ImageWithFallback
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition-colors">

                  Opening
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-lg font-semibold">
                  {facility.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
