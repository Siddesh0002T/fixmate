"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  // Check if the admin is logged in
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isAdminLoggedIn) {
      router.push("/admin/login"); // Redirect to login page if not logged in
    }
  }, [router]);

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold">Welcome to the Admin Dashboard</h1>
      {/* Add dashboard content here */}
      <button
        onClick={() => {
          localStorage.removeItem("isAdminLoggedIn"); // Remove login state
          router.push("/admin/login"); // Redirect to login page
        }}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </section>
  );
}
