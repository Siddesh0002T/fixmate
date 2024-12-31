"use client";

import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  // Google Sign-Up Handler
  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      alert("Google Sign-Up Successful!");
      router.push("/");
    } catch (error: any) {
      alert("Error signing up with Google: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Sign-Up Handler
  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      router.push("/");
    } catch (error: any) {
      alert("Error signing up: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Sign Up for <span className="text-gradient">FixMate</span>
      </h1>
      <p className="text-gray-600 text-center mb-8 max-w-lg mx-auto">
        Create an account to get started with our services.
      </p>

      {/* Email/Password Sign-Up Form */}
      <form
        onSubmit={handleEmailSignUp}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6 border border-gray-200"
      >
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {/* Google Sign-Up */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <p className="text-gray-600">Or</p>
        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className={`p-3 bg-red-600 rounded-lg text-white font-semibold flex items-center space-x-2 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
          }`}
        >
          <span>{loading ? "Processing..." : "Sign Up with Google"}</span>
        </button>
      </div>

      <p className="text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <a href="/getStarted/auth/login" className="text-blue-500 hover:underline">
          Login here
        </a>
      </p>
    </div>
  );
};

export default SignupPage;
