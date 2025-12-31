"use client";

import Image from "next/image";
import { Menu, X, User, LogOut, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "@/public/assets/logo_main.png";
import { useCart } from "@/app/context/CartContext";

type UserType = {
  name: string;
  mobile: string;
};

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const { items, openCart } = useCart();

  /* ---------------- LOAD USER FROM STORAGE ---------------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* ---------------- LOCK BODY SCROLL ---------------- */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* ---------------- ESC KEY CLOSE ---------------- */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---------------- GET FIRST LETTER ---------------- */
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  /* ---------------- ACTIONS ---------------- */
  const goToLogin = () => {
    setIsMenuOpen(false);
    router.push("/signin");
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

  /* ================= RENDER ================= */
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <a href="/" className="block">
            <Image
              src={logo}
              alt="Shri Hanuman Balaji Charitable Diagnostic Centre"
              className="h-12 w-auto"
              priority
            />
          </a>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:flex items-center gap-6">
            <a className="nav-link" onClick={() => router.push("/")}>Home</a>
            <a className="nav-link" onClick={() => router.push("/")}>Locate Us</a>
            <a className="nav-link" onClick={() => router.push("/")}>Facilities</a>
            <a className="nav-link" onClick={() => router.push("/investigations")}>Find A Test</a>
            <a className="nav-link" onClick={() => router.push("/")}>Health Packages</a>
            <a className="nav-link" onClick={() => router.push("/")}>Reach Us</a>

            {/* CART BUTTON */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-orange-600 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {items.length}
                </span>
              )}
            </button>

            {/* LOGIN / USER PROFILE */}
            {user ? (
              <div className="flex items-center gap-3">
                {/* 🔥 PROFILE ICON WITH FIRST LETTER */}
                <button
                  onClick={goToProfile}
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {getInitial(user.name)}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {user.name}
                  </span>
                </button>

                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-sm text-red-600 hover:underline"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={goToLogin}
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                <User className="w-5 h-5" />
                Login / Sign Up
              </button>
            )}
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex text-black flex-col gap-4">

              <a>Home</a>
              <a>Locate Us</a>
              <a>Facilities</a>
              <a onClick={() => router.push("/investigations")}>Find A Test</a>
              <a>Health Packages</a>
              <a>Reach Us</a>

              {user ? (
                <div className="border-t pt-3">
                  {/* 🔥 MOBILE PROFILE SECTION */}
                  <button
                    onClick={goToProfile}
                    className="flex items-center gap-3 mb-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {getInitial(user.name)}
                    </div>
                    <span className="font-medium text-gray-800">
                      {user.name}
                    </span>
                  </button>

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={goToLogin}
                  className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg mt-2"
                >
                  <User className="w-5 h-5" />
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SMALL UTILITY STYLE */}
      <style jsx>{`
        .nav-link {
          color: #374151;
          cursor: pointer;
        }
        .nav-link:hover {
          color: #ea580c;
        }
      `}</style>
    </nav>
  );
}