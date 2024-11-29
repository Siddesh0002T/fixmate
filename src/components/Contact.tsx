import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
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
              <FaPhoneAlt className="text-purple-500 text-3xl" />
              <div>
                <h3 className="text-lg font-bold text-black">Phone</h3>
                <p className="text-black">+1 234 567 890</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-pink-500 text-3xl" />
              <div>
                <h3 className="text-lg font-bold text-black">Email</h3>
                <p className="text-black">support@fixmate.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-indigo-500 text-3xl" />
              <div>
                <h3 className="text-lg font-bold text-black">Address</h3>
                <p className="text-black">
                  123 FixMate Avenue, Suite 456, City, Country
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form action="#" method="POST">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold mb-2 text-black"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold mb-2 text-black"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="example@example.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-bold mb-2 text-black"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-black-950 text-red-400 border border-blue-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
              >
                <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              <p className="text-black">  Send Message</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
