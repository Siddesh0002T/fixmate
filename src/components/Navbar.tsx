"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import SparklesText from "@/components/ui/sparkles-text";
import ShimmerButton from "@/components/ui/shimmer-button";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link';

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
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-lg shadow-md z-50 p-4">
    {/* Logo and Hamburger */}
    <div className="flex justify-between items-center">
      <SparklesText text="FixMate" className="text-black text-3xl font-bold" />
  
      {/* Hamburger Menu Icon for Mobile */}
      <div className="md:hidden flex items-center">
        <button
          className="text-black text-2xl focus:outline-none focus:ring-2 focus:ring-black"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </div>
  
    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center space-x-6 mt-">
      <Link href="/" className="text-black hover:text-gray-600 transition">
        Home
      </Link>
      <Link href="/about" className="text-black hover:text-gray-600 transition">
        About
      </Link>
      <Link href="/services" className="text-black hover:text-gray-600 transition">
        Services
      </Link>
      <Link href="/contact" className="text-black hover:text-gray-600 transition">
        Contact
      </Link>
      {user ? (
        <div className="relative group">
          <img
            src={user.photoURL || "/default-avatar.png"}
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
        <div className="flex space-x-4">
          <Link href="/getStarted/auth/login">
            <ShimmerButton className="shadow-md px-4 py-2 text-sm">
              <span className="text-center font-medium tracking-tight text-white">Log In</span>
            </ShimmerButton>
          </Link>
          <Link href="/getStarted/auth/signup">
            <ShimmerButton className="shadow-md px-4 py-2 text-sm">
              <span className="text-center font-medium tracking-tight text-white">Sign Up</span>
            </ShimmerButton>
          </Link>
        </div>
      )}
    </div>
  
    {/* Mobile Menu */}
    <div
      className={`${
        isMenuOpen ? "block" : "hidden"
      } md:hidden bg-white rounded-lg shadow-md mt-4 p-4 transition-all ease-in-out duration-300 `}
    >
      <Link href="/" className="block text-black hover:text-gray-600 py-2 transition">
        Home
      </Link>
      <hr />
      <Link href="/about" className="block text-black hover:text-gray-600 py-2 transition">
        About
      </Link>
      <hr />
      <Link href="/services" className="block text-black hover:text-gray-600 py-2 transition">
        Services
      </Link>
      <hr />
      <Link href="/contact" className="block text-black hover:text-gray-600 py-2 transition">
        Contact
      </Link>
      <hr />
      {user ? (
        <button
          onClick={handleSignOut}
          className="w-full text-left px-4 py-2 mt-2 text-sm hover:bg-gray-100 bg-gray-200 rounded transition"
        >
          Logout
        </button>
      ) : (
        <div className="mt-4 space-y-2">
          <Link href="/getStarted/auth/login">
            <ShimmerButton className="shadow-md px-4 py-2 text-sm w-full">
              <span className="text-center font-medium tracking-tight text-white">Log In</span>
            </ShimmerButton>
          </Link>
          <br />
          <Link href="/getStarted/auth/signup">
            <ShimmerButton className="shadow-md px-4 py-2 text-sm w-full">
              <span className="text-center font-medium tracking-tight text-white">Sign Up</span>
            </ShimmerButton>
          </Link>
        </div>
      )}
    </div>
  </nav>
  
  
  
  );
};

export default Navbar;
