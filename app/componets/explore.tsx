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
    title: "Others",
    subtitle: "Safe. Secure Collection",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    accent: "blue",
    router: "/others",
  },
];

export function ExploreMore() {
  const router = useRouter();

  return (

    <section className=" py-5 bg-white text-center">
      <div className="max-w-7xl mx-auto mb-5 px-4 sm:px-6 lg:px-8">

        <div>
          <h2 className="inline-flex flex-col text-gray-900 text-2xl font-semibold mb-5">
            Explore More
            <span className="w-20 h-1 bg-orange-600 mt-2"></span>
          </h2>



        </div>



        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center place-items-center">
          {exploreItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => item.router && router.push(item.router)}
                className={`group relative border-2 rounded-xl p-8 
                           transition-all duration-300 cursor-pointer bg-white 
                           w-full max-w-xs shadow-sm hover:shadow-xl
                           ${item.accent === "orange"
                    ? "border-orange-300 hover:border-orange-400 hover:ring-4 hover:ring-orange-100"
                    : "border-orange-300 hover:border-orange-400 hover:ring-4 hover:ring-blue-100"
                  }
                           hover:-translate-y-1`}
              >
                <div className="flex items-center justify-center mb-5">
                  <div
                    className={`${item.bgColor} p-4 rounded-xl 
                                   group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                </div>

                <h3 className="text-gray-900 text-lg font-semibold mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm">
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
