"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, User, ShoppingCart, Search, FileText, ChevronRight } from "lucide-react";
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
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

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
    { name: "Locate Us", href: "/" },
    { name: "Contact", href: "/contact_us" },
  ];

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="block">
                <Image src={logo} alt="Logo" className="h-10 md:h-12 w-auto" priority />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-700 hover:text-orange-600 transition-colors font-medium text-sm xl:text-base">
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop & Mobile Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search Icon (Visible only on mobile header if needed, but we added it in menu) */}
              <button onClick={openCart} className="relative p-2 hover:bg-orange-50 rounded-full transition-colors">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {items.length > 0 && (
                  <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {items.length}
                  </span>
                )}
              </button>

              {/* Desktop User Logic */}
              <div className="hidden md:flex items-center gap-3">
                {user ? (
                  <button onClick={() => router.push("/patient_profile")} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </button>
                ) : (
                  <button onClick={() => setShowLoginModal(true)} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all font-semibold shadow-sm">
                    Login / Sign Up
                  </button>
                )}
              </div>

              {/* Mobile Menu Button - The only way to access links/reports on mobile */}
              <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsMenuOpen(true)}>
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE DRAWER --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          
          {/* Menu Content */}
          <div className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <Image src={logo} alt="Logo" className="h-8 w-auto" />
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-full"><X className="w-6 h-6 text-gray-600" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Search tests..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>

              {/* Nav Items */}
              <nav className="space-y-1">
                <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Navigation</p>
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3.5 text-gray-700 font-semibold hover:bg-orange-50 rounded-xl transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </a>
                ))}
              </nav>

              {/* Patient Portal Section (Login & Reports) */}
              <div className="pt-4 border-t border-gray-100">
                <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Patient Portal</p>
                
                <div className="space-y-3">
                  {/* Reports Button - Custom Requirement */}
                  <button 
                    onClick={() => { setIsMenuOpen(false); router.push("/reports"); }}
                    className="flex items-center gap-4 w-full p-4 bg-orange-50 text-orange-700 rounded-2xl font-bold active:scale-95 transition-transform"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    My Test Reports
                  </button>

                  {user ? (
                    <div className="space-y-2">
                      <button 
                        onClick={() => { setIsMenuOpen(false); router.push("/patient_profile"); }}
                        className="flex items-center gap-4 w-full p-4 bg-gray-50 text-gray-800 rounded-2xl font-bold"
                      >
                        <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        {user.name} (Profile)
                      </button>
                      <button onClick={logout} className="w-full py-3 text-red-500 font-semibold text-sm">Log Out</button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => { setIsMenuOpen(false); setShowLoginModal(true); }}
                      className="flex items-center gap-4 w-full p-4 bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-100"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      Login / Sign Up
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false);
          const storedUser = localStorage.getItem("user");
          if (storedUser) setUser(JSON.parse(storedUser));
        }}
      />
    </>
  );
}