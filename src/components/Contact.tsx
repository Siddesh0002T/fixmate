"use client";

import React, { useState } from "react";
import { db } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { FiThumbsUp } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Save the form data to Firestore
      const docRef = await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: new Date(),
      });

      // Optional: You can implement email functionality here (e.g., via Firebase Functions or third-party service)
      console.log("Contact form submitted successfully, doc ID: ", docRef.id);
      setFormData({ name: "", email: "", message: "" });
      alert("Message sent successfully!");

    } catch (err) {
      setError("Failed to submit form. Please try again.");
      console.error("Error adding document: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-black">
          Get In Touch
        </h2>

        {/* Contact Info and Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FiThumbsUp className="text-purple-500 text-3xl" />
              <div>
                <h3 className="text-lg font-bold text-black">Phone</h3>
                <p className="text-black">+1 234 567 890</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaRegCalendarAlt className="text-pink-500 text-3xl" />
              <div>
                <h3 className="text-lg font-bold text-black">Email</h3>
                <p className="text-black">support@fixmate.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-bold mb-2 text-black">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-bold mb-2 text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-bold mb-2 text-black">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
  type="submit"
  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg shadow-lg hover:bg-gradient-to-l from-pink-500 to-purple-500 hover:shadow-xl transition duration-300"
  disabled={loading}
>
<span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]">
</span>
<p className="text-black">
  {loading ? "Sending..." : "Send Message"}
  </p>
</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
