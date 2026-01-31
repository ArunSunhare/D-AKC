"use client";

import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

export function TopHeader() {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 text-sm shadow-lg">
      <div className="w-full px-3 sm:px-4 lg:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Contact Information */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-all duration-300">
              <Phone className="w-4 h-4" />
              <a href="tel:+917827945650" className="hover:text-yellow-200 transition-colors">
                +91-7827945650
              </a>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-all duration-300">
              <Phone className="w-4 h-4" />
              <a href="tel:+919990867867" className="hover:text-yellow-200 transition-colors">
                +91-9990867867
              </a>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-all duration-300">
              <Phone className="w-4 h-4" />
              <a href="tel:+917827945641" className="hover:text-yellow-200 transition-colors">
                +91-7827945641
              </a>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-all duration-300">
              <Phone className="w-4 h-4" />
              <a href="tel:+917827945651" className="hover:text-yellow-200 transition-colors">
                +91-7827945651
              </a>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-all duration-300">
              <Mail className="w-4 h-4" />
              <a href="mailto:info@hanumanbalajicharitable.com" className="hover:text-yellow-200 transition-colors">
                info@hanumanbalajicharitable.com
              </a>
            </div>
           
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/share/1EWkwyum58/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-110"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/shb_mdhcancerhospital?utm_source=qr&igsh=b2t5MmdhMjJiOWs="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-110"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCo8lav-ndM3QRULU716zORA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-110"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/shb-mdh-cancer-multispeciality-charitable-hospital-742933361?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-110"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
