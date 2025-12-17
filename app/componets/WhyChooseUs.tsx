"use client";
import { Shield, Award, Users, Globe, Cpu, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "15+ years of Trust",
    description: "Trusted by thousands of families for accurate and reliable diagnostic services.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    icon: Users,
    title: "Trust of over 50,000+ consumers",
    description: "Serving the community with dedication and excellence in healthcare diagnostics.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    icon: Cpu,
    title: "Innovative and Advanced Technology",
    description: "State-of-the-art equipment ensuring precise and quick test results.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    icon: Award,
    title: "5000+ Tests and Packages",
    description: "Comprehensive range of diagnostic tests and health checkup packages.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-2">
            Why  <span className="text-orange-600 font-semibold">Choose Us</span>



          </h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 ${feature.iconBg} rounded-lg mb-6`}>
                  <Icon className={`w-10 h-10 ${feature.iconColor}`} />
                </div>
                <h3 className="text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}