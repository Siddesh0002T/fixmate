import React from "react";
import Link from "next/link";

const GetStarted = () => {
  return (
    <section className="bg-gradient-to-r from-lightpurple to-lightpink py-16 text-center text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8">
          Join FixMate today and experience hassle-free home services. Whether
          youre a homeowner or a skilled professional, weve got you covered.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            href="/find-professional"
            className="bg-white text-black py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Find a Professional
          </Link>
          <Link
            href="getStarted/join-professional"
            className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors"
          >
            Join as a Professional
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
