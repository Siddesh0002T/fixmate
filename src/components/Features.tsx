import React from "react";
import SparklesText from "@/components/ui/sparkles-text";


const Features = () => {
    const features = [
        {
          title: "Easy Search",
          description:
            "Find the right professional for any job with our advanced search features.",
          icon: "🔍", // Example icon, can replace with an actual SVG
        },
        {
          title: "Instant Booking",
          description:
            "Book services instantly or schedule appointments at your convenience.",
          icon: "⚡", // Example icon, can replace with an actual SVG
        },
        {
          title: "Verified Professionals",
          description:
            "All professionals are vetted and certified for your peace of mind.",
          icon: "✅", // Example icon, can replace with an actual SVG
        },
        {
          title: "Ratings & Reviews",
          description:
            "Make informed decisions with genuine customer ratings and reviews.",
          icon: "⭐", // Example icon, can replace with an actual SVG
        },
      ];
    
      return (
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Why Choose  <SparklesText text="FixMate?" className="text-black text-4xl font-bold flex-shrink-0" />
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Discover the features that make FixMate the ultimate choice for your service needs.
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-blue-500 text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    };
    

export default Features;