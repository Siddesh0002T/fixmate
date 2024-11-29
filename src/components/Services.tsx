import React from "react";
import { FaWrench, FaPaintRoller, FaPlug, FaHammer } from "react-icons/fa";
import ShimmerButton from "./ui/shimmer-button";

export default function Services() {
  return (
    <section className="relative bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 py-20 px-6 md:px-20">
      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-black">
          Our Services
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <FaWrench className="text-4xl text-purple-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-center text-black mb-2">
              Plumbing Services
            </h3>
            <p className="text-center text-black">
              From fixing leaks to installing pipes, our plumbing experts provide reliable solutions for all your needs.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <FaPlug className="text-4xl text-pink-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-center text-black mb-2">
              Electrical Repairs
            </h3>
            <p className="text-center text-black">
              Safe and efficient electrical services to keep your home powered without any hassle.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <FaPaintRoller className="text-4xl text-indigo-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-center text-black mb-2">
              Painting & Renovation
            </h3>
            <p className="text-center text-black">
              Transform your space with professional painting and renovation services tailored to your style.
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <FaHammer className="text-4xl text-purple-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-center text-black mb-2">
              Carpentry Services
            </h3>
            <p className="text-center text-black">
              Custom furniture, repairs, and woodwork crafted with precision by our skilled carpenters.
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-black mb-4">
            Need something else? We offer a wide range of home repair and maintenance services.
          </p>
          <br />
          <a
            href="/contact"
            className="inline-block"
          >
              <ShimmerButton className="shadow-md px-3 py-1 text-sm">
          <span className="text-center font-medium tracking-tight text-white">Contact Us</span>
        </ShimmerButton>
          </a>
        </div>
      </div>
    </section>
  );
}
