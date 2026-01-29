"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, User, ShoppingCart, Search } from "lucide-react";
import Image from "next/image";
import logo from "@/public/assets/logo_main.png";
import { useCart } from "@/app/context/CartContext";
import { LoginModal } from "./LoginModal";

type UserType = {
  name: string;
  mobile: string;
};

export function LowerHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const { items, openCart } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const openLoginModal = () => {
    setIsMenuOpen(false);
    setShowLoginModal(true);
  };

  const goToProfile = () => {
    setIsMenuOpen(false);
    router.push("/patient_profile");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Find A Test", href: "/investigations" },
    { name: "Health Packages", href: "/health-packages" },
    { name: "Locate Us", href: "/" },
    { name: "Contact", href: "/contact_us" },
  ];

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="block">
                <Image
                  src={logo}
                  alt="Shri Hanuman Balaji Charitable Diagnostic Centre"
                  className="h-10 w-auto"
                  priority
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for tests..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center space-x-6">
              <a
                href="/"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="/about-us"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                About Us
              </a>
              <a
                href="/investigations"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Find A Test
              </a>
              <a
                href="/health-packages"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Health Packages
              </a>
              <a
                href="/"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Locate Us
              </a>
              <a
                href="/contact_us"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Contact
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button onClick={openCart} className="relative p-2">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-600 transition" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <button onClick={goToProfile} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                      {getInitial(user.name)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </button>
                  <button onClick={logout} className="text-red-600 text-sm hover:text-red-700">
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  Login / Sign Up
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for tests..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col gap-3">
                <a
                  href="/"
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/about-us"
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </a>
                <a
                  href="/investigations"
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Find A Test
                </a>
                <a
                  href="/health-packages"
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Health Packages
                </a>
                <a
                  href="/"
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Locate Us
                </a>
                <a
                  href="/contact_us"
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>

                <div className="border-t border-gray-200 pt-3 mt-2">
                  <div className="flex items-center gap-4 px-3 py-2">
                    <button onClick={openCart} className="relative p-2">
                      <ShoppingCart className="w-6 h-6 text-gray-700" />
                      {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {items.length}
                        </span>
                      )}
                    </button>

                    {user ? (
                      <div className="flex-1">
                        <button
                          onClick={goToProfile}
                          className="flex items-center gap-2 w-full"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                            {getInitial(user.name)}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{user.name}</span>
                        </button>
                        <button
                          onClick={logout}
                          className="text-red-600 text-sm hover:text-red-700 mt-1"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={openLoginModal}
                        className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                      >
                        Login / Sign Up
                      </button>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setIsMenuOpen(false);
        }}
        onSuccess={() => {
          setShowLoginModal(false);
          setIsMenuOpen(false);
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }}
      />
    </>
  );
}
