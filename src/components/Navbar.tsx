import React from 'react';
import SparklesText from "@/components/ui/sparkles-text";
import ShimmerButton from "@/components/ui/shimmer-button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md shadow-md z-50 p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <SparklesText
          text="FixMate"
          className="text-black text-3xl font-bold flex-shrink-0"
        />
      </div>

      {/* Navigation Links and Buttons */}
      <div className="flex items-center space-x-6">
        <div className="flex space-x-6">
          <a href="/about" className="text-black hover:text-gray-500">
            About
          </a>
          <a href="/services" className="text-black hover:text-gray-500">
            Services
          </a>
          <a href="/contact" className="text-black hover:text-gray-500">
            Contact
          </a>
        </div>
        <ShimmerButton className="shadow-md px-3 py-1 text-sm">
          <span className="text-center font-medium tracking-tight text-white">Log In</span>
        </ShimmerButton>
        <ShimmerButton className="shadow-md px-3 py-1 text-sm">
          <span className="text-center font-medium tracking-tight text-white">Sign Up</span>
        </ShimmerButton>

      </div>
    </nav>
  );
};

export default Navbar;
