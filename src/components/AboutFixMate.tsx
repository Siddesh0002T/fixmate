import React from "react";

export default function AboutFixMate() {
  return (
    <section className="relative bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 py-20 px-6 md:px-20">
      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-8 text-black">
          About FixMate
        </h2>

        {/* Content */}
        <div className="text-lg leading-relaxed text-center md:text-left text-black">
          <p className="mb-6">
          <b>FixMate</b> is your ultimate partner for simplifying and streamlining your home repair and maintenance needs. 
            Our platform connects homeowners with trusted professionals to handle everything from plumbing and electrical 
            work to painting and carpentry  all in just a few clicks.
          </p>

          <p className="mb-6">
            We believe in transforming the hassle of finding the right professionals into a seamless, reliable, and enjoyable 
            experience. At FixMate, quality and trust are at the core of everything we do. Our mission is to empower users 
            with a platform that ensures transparent communication, fair pricing, and top-notch service.
          </p>

          <p className="mb-6">
            Whether it's a quick fix or a major project, FixMate is here to ensure your home stays in perfect condition, 
            with services backed by experienced professionals and a user-friendly booking system.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="mt-10">
          <h3 className="text-3xl md:text-4xl font-semibold text-center mb-6 text-black">
            Our Mission & Vision
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold mb-4 text-black">Our Mission</h4>
              <p className="text-black">
                To provide a one-stop solution for home maintenance by connecting homeowners 
                with skilled professionals in a seamless and efficient way.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold mb-4 text-black">Our Vision</h4>
              <p className="text-black">
                To become the most trusted and widely used platform for home services, setting new standards in 
                quality, convenience, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
