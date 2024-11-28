// Add this at the very top of the file
"use client"; 

import React, { useState } from "react";
import SparklesText from "@/components/ui/sparkles-text";
import ShimmerButton from "@/components/ui/shimmer-button";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing Hamburger & Close Icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md shadow-md z-50 p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <SparklesText
          text="FixMate"
          className="text-black text-3xl font-bold flex-shrink-0"
        />
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="md:hidden flex items-center" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes className="text-black text-2xl" /> : <FaBars className="text-black text-2xl" />}
      </div>

      {/* Navigation Links and Buttons */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex items-center space-x-6`} // Hide menu on mobile unless toggled
      >
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

      {/* Mobile Menu (on toggle) */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden absolute top-16 left-0 w-full bg-white p-4 shadow-md rounded-md space-y-4`}
      >
        <a href="/about" className="text-black hover:text-gray-500 block">
          About
        </a>
        <a href="/services" className="text-black hover:text-gray-500 block">
          Services
        </a>
        <a href="/contact" className="text-black hover:text-gray-500 block">
          Contact
        </a>
        <ShimmerButton className="shadow-md px-3 py-1 text-sm w-full">
          <span className="text-center font-medium tracking-tight text-white">Log In</span>
        </ShimmerButton>
        <ShimmerButton className="shadow-md px-3 py-1 text-sm w-full">
          <span className="text-center font-medium tracking-tight text-white">Sign Up</span>
        </ShimmerButton>
      </div>
    </nav>
  );
};

export default Navbar;
