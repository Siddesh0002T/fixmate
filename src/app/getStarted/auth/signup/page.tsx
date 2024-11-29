"use client";

import React from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { RainbowButton } from "@/components/ui/rainbow-button";

const SignupPage = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Google Sign-Up Successful!");
      router.push("/");
    } catch (error) {
      alert("Error signing up with Google: " + error.message);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = e.currentTarget.elements as any;

    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      alert("Account created successfully!");
      router.push("/");
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Sign Up for <span className="text-gradient">FixMate</span>
        </h1>
        <p className="text-gray-600 text-center mb-8 max-w-lg mx-auto">
          Create an account to get started with our services.
        </p>

        <form onSubmit={handleEmailSignUp} className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6 border border-gray-200">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-lg text-white font-semibold"
          >
            <RainbowButton>Sign Up</RainbowButton>
          </button>
        </form>

        <div className="flex justify-center items-center space-x-4 mt-6">
          <p className="text-gray-600">Or</p>
          <button
            onClick={handleGoogleSignUp}
            className="p-3 bg-red-600 rounded-lg hover:bg-red-700 text-white font-semibold flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" className="fill-current">
              <path d="M23.49 12.3c0-.72-.06-1.38-.17-2h-9.1v3.06h5.31c-1.29 3.02-4.99 5.24-9.3 5.24-5.49 0-9.94-4.46-9.94-9.94s4.46-9.94 9.94-9.94c2.77 0 5.27 1.03 7.17 2.76l3.98-3.98c-2.95-2.67-6.84-4.34-11.15-4.34-8.19 0-14.85 6.66-14.85 14.85s6.66 14.85 14.85 14.85c8.25 0 14.85-6.6 14.85-14.85z"/>
            </svg>
            <span>Sign Up with Google</span>
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/getStarted/auth/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </>
  );
};

export default SignupPage;
