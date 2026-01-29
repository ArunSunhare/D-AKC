"use client";

import { Facebook, Instagram, Youtube, Linkedin, Share2 } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/share/1EWkwyum58/",
    color: "bg-blue-600 hover:bg-blue-700",
    description: "Follow us on Facebook for updates"
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/shb_mdhcancerhospital?utm_source=qr&igsh=b2t5MmdhMjJiOWs=",
    color: "bg-pink-600 hover:bg-pink-700",
    description: "Follow us on Instagram for daily health tips"
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/channel/UCo8lav-ndM3QRULU716zORA",
    color: "bg-red-600 hover:bg-red-700",
    description: "Subscribe to our YouTube channel for health videos"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/shb-mdh-cancer-multispeciality-charitable-hospital-742933361?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    color: "bg-blue-700 hover:bg-blue-800",
    description: "Connect with us on LinkedIn"
  }
];

export function SocialFollowSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Follow Us on Social Media
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay connected with us for the latest health updates, medical tips, and hospital news. Join our community on social media platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className={`${social.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                    {social.name}
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    {social.description}
                  </p>
                </div>
                <div className="bg-gray-50 px-6 py-3 group-hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-center gap-2 text-orange-600 font-medium text-sm">
                    <Share2 className="w-4 h-4" />
                    Follow Now
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-white rounded-lg shadow-md px-6 py-4">
            <span className="text-gray-700 font-medium">Share our page:</span>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200`}
                    aria-label={`Share on ${social.name}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
