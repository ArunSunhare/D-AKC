"use client";
import {
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock
} from "lucide-react";

import Image from "next/image"; // ✅ FIXED IMPORT
import logo from "@/public/assets/logo_main.png";
import { ImageWithFallback } from "./figma/callbackimgs";

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

                {/* LOGO — Now FIXED */}
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
                A wonderful serenity has taken possession of my entire soul,
                like these sweet mornings of spring which I enjoy with my whole heart.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://www.facebook.com/share/1EWkwyum58/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="facebook"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shb-mdh-cancer-multispeciality-charitable-hospital-742933361?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="linkedin"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCo8lav-ndM3QRULU716zORA"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="youtube"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-red-600 text-white shadow hover:bg-red-700 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/shb_mdhcancerhospital?utm_source=qr&igsh=b2t5MmdhMjJiOWs="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="instagram"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-pink-600 text-white shadow hover:bg-pink-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Reach Out */}
            <div>
              <h4 className="text-white text-xl font-semibold mb-6">Reach Out</h4>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <p>
                      Yugpurush Mahashay <br />
                      Dharampal MDH Charitable Diagnostic Bhawan, <br />
                      Karkardooma Institutional Area, Plot No. X-24, <br />
                      New Delhi-110092
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <a href="tel:+917827945650" className="hover:text-white">
                      +91-7827945650
                    </a>
                    <br />
                    <a href="tel:+917827945651" className="hover:text-white">
                      +91-7827945651
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <a href="mailto:info@hanumanbalajicharitable.com" className="hover:text-white">
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
                  <a href="#" className="flex items-center gap-2 hover:text-white">
                    <span className="text-blue-400">›</span> View Departments
                  </a>
                </li>
                <li>
                  <a href="/contact_us" className="flex items-center gap-2 hover:text-white">
                    <span className="text-blue-400">›</span>  Contact Us
                  </a>
                </li>
                 <li>
                  <a href="/T&P" className="flex items-center gap-2 hover:text-white">
                    <span className="text-blue-400">›</span>  Term & Conditions
                  </a>
                </li>
                 <li>
                  <a href="/Privacy_policy" className="flex items-center gap-2 hover:text-white">
                    <span className="text-blue-400">›</span>  Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/about-us" className="flex items-center gap-2 hover:text-white">
                    <span className="text-blue-400">›</span> About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Hospital Timings */}
            <div>
              <h4 className="text-white text-xl font-semibold mb-6">Hospital Timings</h4>

              <div className="w-full max-w-xs border border-gray-400">
                <div className="grid grid-cols-2 divide-x divide-gray-400">
                  <div className="p-4 border-b border-gray-400">
                    <p className="text-gray-300">Mon - Sun</p>
                  </div>
                  <div className="p-4 border-b border-gray-400">
                    <p className="text-gray-300 text-center">24 × 7</p>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-300">All Days Open</p>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-300">24 Hours</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="#"
                  className="inline-block px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                >
                  Call Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#253037] py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Shri Hanuman Balaji Charitable Diagnostic Centre. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
