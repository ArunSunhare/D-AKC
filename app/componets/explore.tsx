"use client";

import { Search, Home, Package } from "lucide-react";
import { useRouter } from "next/navigation";

const exploreItems = [
  {
    icon: Package,
    title: "Health Packages",
    subtitle: "Mode wise Health Checkup",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    accent: "orange",
    router: "/health-packages",
  },
  {
    icon: Search,
    title: "Find a Test",
    subtitle: "Fast. Hassle-free process",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    accent: "orange",
    router: "/investigations",
  },
  {
    icon: Home,
    title: "Facilities",
    subtitle: "Safe. Secure Collection",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    accent: "blue",
    router: "/#facilities",
  },
];

export function ExploreMore() {
  const router = useRouter();
  
  return (
    <section className="py-8 md:py-12 bg-white text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <h2 className="flex flex-col items-center text-gray-900 text-xl md:text-2xl font-semibold">
            Explore More
            <span className="w-16 md:w-20 h-1 bg-red-600 mt-2 rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 justify-items-center px-2">
          {exploreItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => {
                  if (item.router) {
                    if (item.router === "/#facilities") {
                      // Handle facilities navigation with smooth scroll
                      if (window.location.pathname === "/") {
                        // Already on home page, just scroll
                        const element = document.getElementById("facilities");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      } else {
                        // Navigate to home page with hash
                        router.push("/#facilities");
                      }
                    } else {
                      // Handle other routes normally
                      router.push(item.router);
                    }
                  }
                }}
                className={`group relative border-2 rounded-xl 
                           p-3 md:p-5 lg:p-8 
                           transition-all duration-300 cursor-pointer bg-white 
                           w-full shadow-sm hover:shadow-xl
                           ${
                             item.accent === "orange"
                               ? "border-orange-100 hover:border-orange-400 hover:ring-4 hover:ring-orange-50"
                               : "border-orange-100 hover:border-orange-400 hover:ring-4 hover:ring-blue-50"
                           }
                           hover:-translate-y-1`}
              >
                <div className="flex items-center justify-center mb-2 md:mb-3 lg:mb-5">
                  <div
                    className={`${item.bgColor} p-2 md:p-3 lg:p-4 rounded-xl 
                                   group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 ${item.color}`} />
                  </div>
                </div>
                <h3 className="text-gray-900 text-xs md:text-sm lg:text-base font-semibold mb-1 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-xs lg:text-sm">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}