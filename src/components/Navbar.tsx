"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import SparklesText from "@/components/ui/sparkles-text";
import ShimmerButton from "@/components/ui/shimmer-button";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
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
        } md:flex items-center space-x-6`}
      >
        <div className="flex space-x-6">
          <a href="/" className="text-black hover:text-gray-500">
            Home
          </a>
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
        {user ? (
          <div className="relative group">
            <img
              src={user.photoURL || "/default-avatar.png"} // Use user's photoURL or default avatar
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg hidden group-hover:block">
              <p className="px-4 py-2 text-sm font-medium">{user.displayName || "User"}</p>
              <hr />
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <a href="/getStarted/auth/login">
              <ShimmerButton className="shadow-md px-3 py-1 text-sm">
                <span className="text-center font-medium tracking-tight text-white">Log In</span>
              </ShimmerButton>
            </a>
            <a href="/getStarted/auth/signup">
              <ShimmerButton className="shadow-md px-3 py-1 text-sm">
                <span className="text-center font-medium tracking-tight text-white">Sign Up</span>
              </ShimmerButton>
            </a>
          </>
        )}
      </div>

      {/* Mobile Menu */}
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
        {user ? (
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 bg-gray-200 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <a href="/getStarted/auth/login">
              <ShimmerButton className="shadow-md px-3 py-1 text-sm w-full">
                <span className="text-center font-medium tracking-tight text-white">Log In</span>
              </ShimmerButton>
            </a>
            <a href="/getStarted/auth/signup">
              <ShimmerButton className="shadow-md px-3 py-1 text-sm w-full">
                <span className="text-center font-medium tracking-tight text-white">Sign Up</span>
              </ShimmerButton>
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
