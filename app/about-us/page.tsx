"use client";

import Image from "next/image";
import { Navigation } from "../componets/navbar";
import { Footer } from "../componets/footer";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-700 to-gray-600 py-16 overflow-hidden">
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
          <div className="max-w-3xl">
            <h1 className="text-white mb-4 text-4xl md:text-5xl font-bold">
              About Us
            </h1>
            <p className="text-white/90 text-lg md:text-xl">
              Shri Hanuman Balaji Charitable Diagnostic Centre – A beacon of hope and selfless service
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16 space-y-10 text-gray-800 leading-relaxed text-lg">
            {/* Opening Blessing Paragraph */}
            <p className="text-justify">
              Under the auspicious aegis and with the kind blessings of the revered great Lord Shri Hanuman Bala ji, the most sacred, pious, selfless server not only of the great Lord Ram ji but also of the entire mankind as per the kind directions of the great Goddess Mata Sita ji and also with the kind forever blessings of the great philanthropist honourable Mahashya Dharam Pal Gulati ji of MDH group, <strong>Shri Hanuman Balaji Mandir Vivek Vihar New Delhi 110095</strong> and <strong>Abhinandan Jan Kalyan Society</strong> has opened and is running a state-of-the-art charitable diagnostic and dialysis centre under the name and style of{" "}
              <strong>Shri Hanuman Balaji Charitable Diagnostic Centre</strong> in its{" "}
              <strong>Yugpurush Mahashia Dharam Pal MDH Charitable Diagnostic Bhawan</strong> at{" "}
              <strong>X-24, Karkardooma Institutional Area, New Delhi 110092</strong>.
            </p>

            {/* Primary Focus */}
            <div className="bg-orange-50 border-l-4 border-orange-600 p-8 rounded-r-xl">
              <p className="text-xl font-semibold text-orange-800 italic text-center">
                Our primary focus remains on extending unwavering support to the economically disadvantaged sections of society.
              </p>
            </div>

            {/* Services & Commitment */}
            <p className="text-justify">
              At <strong>Shri Hanuman Balaji Charitable Diagnostic Centre</strong>, we take pride in offering a spectrum of high-quality services, each equipped with the latest and most advanced technology. As we progress, our aspiration is to ensure these services are accessible around the clock, 365 days a year.
            </p>

            <p className="text-justify">
              Our dedication to delivering subsidized services at direct cost underscores our identity as a <strong>“Real Charitable Centre,”</strong> rooted in a genuine spirit of service rather than mere profit.
            </p>

            {/* Closing Statement */}
            <div className="mt-12 bg-gradient-to-r from-orange-100 to-orange-50 p-10 rounded-xl text-center">
              <p className="text-2xl font-bold text-orange-700">
                Serving Humanity with Devotion, Compassion and Excellence
              </p>
              <p className="mt-4 text-gray-700">
                Inspired by Lord Hanuman ji’s selfless seva and the philanthropic vision of Mahashya Dharam Pal Gulati ji
              </p>
            </div>

            {/* Address Card */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Centre Location</h3>
                <p className="text-gray-700">
                  Yugpurush Mahashia Dharam Pal MDH Charitable Diagnostic Bhawan<br />
                  X-24, Karkardooma Institutional Area,<br />
                  New Delhi 110092
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Managed By</h3>
                <p className="text-gray-700">
                  Shri Hanuman Balaji Mandir Vivek Vihar<br />
                  New Delhi 110095<br />
                  &<br />
                  Abhinandan Jan Kalyan Society
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}