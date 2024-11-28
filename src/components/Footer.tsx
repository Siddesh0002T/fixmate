import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";  // Import icons for social media

const Footer = () => {
  return (
    <footer className="bg-white text-black py-8">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-purple-500">About Us</a></li>
              <li><a href="#services" className="hover:text-purple-500">Services</a></li>
              <li><a href="#professionals" className="hover:text-purple-500">Professionals</a></li>
              <li><a href="#blog" className="hover:text-purple-500">Blog</a></li>
              <li><a href="#support" className="hover:text-purple-500">Support</a></li>
              <li><a href="#faqs" className="hover:text-purple-500">FAQs</a></li>
              <li><a href="#contact" className="hover:text-purple-500">Contact Us</a></li>
              <li><a href="#privacy" className="hover:text-purple-500">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-purple-500">Terms of Service</a></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-black hover:text-blue-600">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-black hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-black hover:text-pink-500">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-black hover:text-blue-700">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Footer Text */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">FixMate</h3>
            <p>Your trusted partner for home services.</p>
          </div>
        </div>
        <br />
<hr />
        {/* Copyright */}
        <div className="mt-8 text-center text-sm">
          <p>© 2024 FixMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
