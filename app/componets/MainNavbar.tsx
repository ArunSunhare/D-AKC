"use client";

export function MainNavbar() {
  return (
    <div className="bg-white-500 hidden lg:block">
      <nav className="w-full px-3 sm:px-4 lg:px-10 h-12 flex items-center gap-8 text-white font-medium">
        <a href="/" className="text-gray-700 hover:text-orange-200 transition-colors">Home</a>
        <a href="/about-us" className="text-gray-700 hover:text-orange-200 transition-colors">About Us</a>
        <a href="/investigations" className="text-gray-700 hover:text-orange-200 transition-colors">Find A Test</a>
        <a href="/health-packages" className="text-gray-700 hover:text-orange-200 transition-colors">Health Packages</a>
        {/* <a href="/" className="text-gray-700 hover:text-orange-200 transition-colors">Locate Us</a> */}
        <a href="/contact_us" className="text-gray-700 hover:text-orange-200 transition-colors">Contact</a>
      </nav>
    </div>
  );
}
