"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isAdminLoggedIn) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <section className="p-8">
        <br /><br />
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-4">
        <button
          onClick={() => router.push("/admin/contacts")}
          className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg shadow-lg hover:bg-gradient-to-l from-pink-500 to-purple-500 hover:shadow-xl transition duration-300 text-black-500"
        >
          View Contact Messages
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("isAdminLoggedIn");
            router.push("/admin/login");
          }}
          className="block w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </section>
  );
}
