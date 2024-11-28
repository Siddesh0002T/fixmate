import React from 'react';
import Link from 'next/link'; // Use Next.js Link component for internal routing

const RubbySoftSection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white py-16 px-6">
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-6">
          Welcome to RubbySoft
        </h2>
        <p className="text-lg mb-8">
          Your trusted partner in innovative solutions. We deliver the best in web development, software design, and personalized technology services.
        </p>

        {/* Call-to-Action */}
        <div className="flex justify-center gap-4">
          <Link href="/services">
            <button className="bg-white text-purple-500 hover:bg-gray-100 px-6 py-3 rounded-lg text-lg transition duration-300">
              Explore Our Services
            </button>
          </Link>
          <Link href="/contact">
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-500 px-6 py-3 rounded-lg text-lg transition duration-300">
              Get in Touch
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RubbySoftSection;
