"use client";

import Image from "next/image";
import { Menu, X, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "@/public/assets/logo_main.png";
// import SignInModal from "/signin"; ❌ no longer needed

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goToLogin = () => {
    setIsMenuOpen(false);
    router.push("/signin");
  };

  return (
    <>
      <nav
        className="bg-white border-b border-gray-200 sticky top-0 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" aria-label="Home" className="block">
                <Image
                  src={logo}
                  alt="Shri Hanuman Balaji Charitable Diagnostic Centre"
                  className="h-12 w-auto"
                  priority
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-orange-600">Home</a>
              <button className="text-gray-700 hover:text-orange-600">Locate Us ▼</button>
              <button className="text-gray-700 hover:text-orange-600">Facilities ▼</button>
              <button className="text-gray-700 hover:text-orange-600">Find A Test ▼</button>
              <button className="text-gray-700 hover:text-orange-600">Health Packages ▼</button>
              <button className="text-gray-700 hover:text-orange-600">Reach Us ▼</button>

              <button
                type="button"
                onClick={goToLogin}
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                <User className="w-5 h-5" />
                <span>Login / Sign Up</span>
              </button>
            </div>

            {/* Mobile Button */}
            <button
              type="button"
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <a href="#">Home</a>
                <a href="#">Locate Us</a>
                <a href="#">Facilities</a>
                <a href="#">Find A Test</a>
                <a href="#">Health Packages</a>
                <a href="#">Reach Us</a>

                <button
                  onClick={goToLogin}
                  className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg mt-2"
                >
                  <User className="w-5 h-5" />
                  Login / Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
