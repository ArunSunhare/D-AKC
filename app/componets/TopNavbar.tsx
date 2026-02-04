"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, FileText, Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "@/public/assets/logo_main.png";
import personLeft from "@/public/assets/person-left.png";
import personRight from "@/public/assets/person-right.png";
import { useCart } from "@/app/context/CartContext";
import { LoginModal } from "./LoginModal";
import { Search_Bar } from "./search_bar";

type UserType = {
  name: string;
  mobile: string;
};

export function TopNavbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const { items, openCart } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  const getDisplayName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return "";
    const first = trimmed.split(/\s+/)[0];
    return first || trimmed;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="bg-white border-b sticky top-0 z-50 w-full overflow-x-hidden">
        <div className="w-full px-3 sm:px-4 lg:px-10 h-16 flex items-center justify-between gap-1 sm:gap-4">
          
          {/* Logo and Person Images */}
          <a href="/" className="flex-shrink-0 flex items-center gap-2">
            <Image
              src={logo}
              alt="Logo"
              className="h-15 w-auto"
              priority
            />
            <Image
              src={personLeft}
              alt="Person Left"
              className="h-18 w-18 rounded-full"
              priority
            />
            <Image
              src={personRight}
              alt="Person Right"
              className="h-18 w-18 rounded-full"
              priority
            />
          </a>

          {/* Search - Desktop Only */}
          <div className="hidden sm:block flex-1 max-w-lg">
            <Search_Bar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
            {/* Reports */}
            <a 
              href="https://shbcdc.in/online_his/design/online_lab/default.aspx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all flex-shrink-0"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden md:block text-sm font-semibold">Reports</span>
            </a>

            {/* Cart */}
            <button 
              onClick={openCart} 
              className="relative flex items-center justify-center p-1.5 sm:p-2 text-gray-700 hover:text-orange-600 transition-colors flex-shrink-0"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </button>

            {/* Login / Profile */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push("/patient_profile")}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  {getInitial(user.name)}
                </button>
                <button
                  onClick={() => router.push("/patient_profile")}
                  className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors max-w-[160px] truncate"
                  title={user.name}
                >
                  {getDisplayName(user.name)}
                </button>
                <button
                  onClick={logout}
                  className="text-sm text-red-600 hover:underline hidden md:block"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-orange-500 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-orange-600 transition-colors font-medium flex-shrink-0"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Navbar */}
      <div className="sm:hidden bg-white border-b sticky top-16 z-40 w-full">
        <div className="px-3 py-3">
          <Search_Bar />
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          const storedUser = localStorage.getItem("user");
          if (storedUser) setUser(JSON.parse(storedUser));
          setShowLoginModal(false);
        }}
      />
    </>
  );
}
