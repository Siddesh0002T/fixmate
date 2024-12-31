"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { RainbowButton } from "@/components/ui/rainbow-button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      alert("Google Sign-In Successful!");
      router.push("/");
    } catch (error: any) {
      alert("Error signing in with Google: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Email Sign-In Successful!");
      router.push("/");
    } catch (error: any) {
      alert("Error signing in: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Login to <span className="text-gradient">FixMate</span>
      </h1>
      <p className="text-gray-600 text-center mb-8 max-w-lg mx-auto">
        Please enter your credentials to access your account.
      </p>

      {/* Email/Password Login Form */}
      <form
        onSubmit={handleEmailSignIn}
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

        <RainbowButton
          type="submit"
          className={`w-full p-3 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </RainbowButton>
      </form>

      {/* Google Login */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <p className="text-gray-600">Or</p>
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`p-3 bg-red-600 rounded-lg text-white font-semibold flex items-center space-x-2 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
          }`}
        >
          <span>{loading ? "Processing..." : "Login with Google"}</span>
        </button>
      </div>

      <p className="text-center text-gray-600 mt-6">
        Don't have an account?{" "}
        <a href="/getStarted/auth/signup" className="text-blue-500 hover:underline">
          Sign up here
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
