"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, FileText, Menu, X, ChevronRight, User, LogOut } from "lucide-react";
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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const getInitial = (name: string) => name?.charAt(0).toUpperCase() || "U";

  const getDisplayName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return "";
    const first = trimmed.split(/\s+/)[0];
    return first || trimmed;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    router.push("/");
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Find A Test", href: "/investigations" },
    { name: "Health Packages", href: "/health-packages" },
    { name: "Facilities", href: "/#facilities" },
    { name: "Doctors", href: "/#doctors" },
    { name: "Contact Us", href: "/contact_us" },
  ];

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <div className="bg-white border-b sticky top-0 z-50 w-full overflow-x-hidden shadow-sm">
        <div className="w-full px-3 sm:px-4 lg:px-10 h-20 flex items-center justify-between gap-1 sm:gap-4">
          
          {/* Logo and Person Images - Desktop design preserved */}
          <a href="/" className="flex-shrink-0 flex items-center gap-2">
            <Image src={logo} alt="Logo" className="h-12 sm:h-15 w-auto" priority />
            {/* Dono images ko desktop aur mobile dono pe rakha hai jaisa aapne kaha */}
            <Image src={personLeft} alt="Person Left" className="h-14 w-14 sm:h-18 sm:w-18 rounded-full border border-gray-100" priority />
            <Image src={personRight} alt="Person Right" className="h-14 w-14 sm:h-18 sm:w-18 rounded-full border border-gray-100" priority />
          </a>

          {/* Search - Desktop Only */}
          <div className="hidden lg:block flex-1 max-w-lg">
            <Search_Bar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
            
            {/* Reports - Desktop Only */}
            <a 
              href="https://shbcdc.in/online_his/design/online_lab/default.aspx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm font-semibold">Reports</span>
            </a>

            {/* Cart - Always Visible */}
            <button onClick={openCart} className="relative p-1.5 sm:p-2 text-gray-700 hover:text-orange-600 transition-colors">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </button>

            {/* Login / Profile - Desktop Only */}
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => router.push("/patient_profile")} className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center">
                    {getInitial(user.name)}
                  </button>
                  <span className="hidden lg:block text-sm font-semibold text-gray-700 max-w-[100px] truncate">
                    {getDisplayName(user.name)}
                  </span>
                  <button onClick={logout} className="ml-2 text-xs text-red-600 font-bold hover:underline">Logout</button>
                </div>
              ) : (
                <button onClick={() => setShowLoginModal(true)} className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-all">
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle - Only on Mobile */}
            <button className="md:hidden p-2 text-gray-700" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE SEARCH BAR (Below main navbar on mobile) --- */}
      <div className="md:hidden bg-white border-b sticky top-20 z-40 w-full px-3 py-3">
        <Search_Bar />
      </div>

      {/* --- MOBILE FULLSCREEN MENU (Drawer) --- */}
      
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[80%] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b flex items-center justify-between">
              <Image src={logo} alt="Logo" className="h-10 w-auto" />
              <button onClick={() => setIsMenuOpen(false)} className="p-2"><X className="w-7 h-7 text-gray-500" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Nav Links */}
              <nav className="space-y-1">
                <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Navigation</p>
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => { router.push(item.href); setIsMenuOpen(false); }}
                    className="flex items-center justify-between w-full p-4 text-gray-700 font-bold hover:bg-orange-50 rounded-xl"
                  >
                    {item.name}
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </button>
                ))}
              </nav>

              {/* Patient Portal Section (Mobile Only) */}
              <div className="pt-4 border-t border-gray-100">
                <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Patient Portal</p>
                <div className="grid gap-3">
                  <a 
                    href="https://shbcdc.in/online_his/design/online_lab/default.aspx" 
                    target="_blank"
                    className="flex items-center gap-4 w-full p-4 bg-orange-50 text-orange-700 rounded-2xl font-bold"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    Download Reports
                  </a>

                  {user ? (
                    <div className="space-y-3">
                      <button onClick={() => { router.push("/patient_profile"); setIsMenuOpen(false); }} className="flex items-center gap-4 w-full p-4 bg-gray-50 rounded-2xl font-bold border">
                        <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                          {getInitial(user.name)}
                        </div>
                        <div className="text-left"><p className="text-xs text-gray-500">Welcome,</p><p className="text-sm">{user.name}</p></div>
                      </button>
                      <button onClick={logout} className="w-full py-2 text-red-600 font-bold flex items-center justify-center gap-2"><LogOut className="w-4 h-4" /> Logout</button>
                    </div>
                  ) : (
                    <button onClick={() => { setIsMenuOpen(false); setShowLoginModal(true); }} className="flex items-center gap-4 w-full p-4 bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-200">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"><User className="w-6 h-6" /></div>
                      Login / Sign Up
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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