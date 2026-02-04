"use client";
import {
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  MessageCircle
} from "lucide-react";

import Image from "next/image";
import logo from "@/public/assets/logo_main.png";

export function Footer() {
  return (
    <footer className="bg-[#2f3b43] text-gray-200">
      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand & Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="border border-orange-500 p-1 bg-white rounded-sm">
                  <Image
                    src={logo}
                    alt="Shri Hanuman Balaji Charitable Diagnostic Centre"
                    className="h-12 w-auto"
                    priority
                  />
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Dedicated to providing high-quality, affordable diagnostic and medical services 
                to all sections of society with compassion and excellence.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://www.facebook.com/share/1EWkwyum58/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shb-mdh-cancer-multispeciality-charitable-hospital-742933361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-700 text-white shadow hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCo8lav-ndM3QRULU716zORA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-red-600 text-white shadow hover:bg-red-700 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/shb_mdhcancerhospital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-pink-600 text-white shadow hover:bg-pink-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Reach Out — All numbers linked to match your header */}
            <div>
              <h4 className="text-white text-xl font-semibold mb-6">Reach Out</h4>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm">
                      Plot No. X-24, Karkardooma Institutional Area, <br />
                      Near Karkardooma Metro Station, <br />
                      New Delhi-110092
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <a href="tel:+919990867867" className="hover:text-white transition-colors">
                      +91-9990867867
                    </a>
                    <a href="tel:+917827945651" className="hover:text-white transition-colors">
                      Lab: +91-7827945651
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <a href="https://wa.me/917827945641" target="_blank" className="hover:text-white transition-colors">
                      +91-7827945641 (WhatsApp)
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <a href="mailto:info@hanumanbalajicharitable.com" className="hover:text-white break-all transition-colors">
                      info@hanumanbalajicharitable.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="text-white text-xl font-semibold mb-6">Useful Links</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="/about-us" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="text-orange-500">›</span> About Us
                  </a>
                </li>
                <li>
                  <a href="/investigations" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="text-orange-500">›</span> Find A Test
                  </a>
                </li>
                <li>
                  <a href="/health-packages" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="text-orange-500">›</span> Health Packages
                  </a>
                </li>
                <li>
                  <a href="/contact_us" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="text-orange-500">›</span> Contact Us
                  </a>
                </li>
                <li>
                  <a href="/T&P" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="text-orange-500">›</span> Term & Conditions
                  </a>
                </li>
                <li>
                  <a href="/Privacy_policy" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="text-orange-500">›</span> Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Hospital Timings */}
            <div>
              <h4 className="text-white text-xl font-semibold mb-6">Hospital Timings</h4>

              <div className="w-full max-w-xs border border-gray-500 rounded-sm overflow-hidden">
                <div className="grid grid-cols-2 divide-x divide-gray-500">
                  <div className="p-3 border-b border-gray-500 bg-[#253037]">
                    <p className="text-gray-300 text-sm">Mon - Sun</p>
                  </div>
                  <div className="p-3 border-b border-gray-500">
                    <p className="text-orange-500 text-center font-bold">24 × 7</p>
                  </div>
                  <div className="p-3 bg-[#253037]">
                    <p className="text-gray-300 text-xs">Services</p>
                  </div>
                  <div className="p-3">
                    <p className="text-gray-300 text-xs text-center">Open All Days</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="tel:+919990867867"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition font-bold shadow-lg"
                >
                  <Phone className="w-4 h-4" /> Call For Appointment
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1f292e] py-6 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              ©️ {new Date().getFullYear()} Shri Hanuman Balaji Charitable Diagnostic Centre. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="/Privacy_policy" className="text-gray-400 hover:text-white text-xs transition-colors">
                Privacy Policy
              </a>
              <a href="/T&P" className="text-gray-400 hover:text-white text-xs transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}