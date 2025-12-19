"use client";

import Image from "next/image";
import { Menu, X, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "@/public/assets/logo_main.png";

type UserType = {
  name: string;
  mobile: string;
};

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

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

  /* ---------------- ACTIONS ---------------- */
  const goToLogin = () => {
    setIsMenuOpen(false);
    router.push("/signin");
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
            <a className="nav-link">Home</a>
            <a className="nav-link">Locate Us</a>
            <a className="nav-link">Facilities</a>
            <a className="nav-link">Find A Test</a>
            <a className="nav-link">Health Packages</a>
            <a className="nav-link">Reach Us</a>

            {/* LOGIN / USER */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">
                  👋 {user.name}
                </span>

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
            <div className="flex flex-col gap-4">
              <a>Home</a>
              <a>Locate Us</a>
              <a>Facilities</a>
              <a>Find A Test</a>
              <a>Health Packages</a>
              <a>Reach Us</a>

              {user ? (
                <div className="border-t pt-3">
                  <p className="font-medium mb-2">👋 {user.name}</p>
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
