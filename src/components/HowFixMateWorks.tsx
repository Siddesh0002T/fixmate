import React from "react";

const HowFixMateWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Describe Your Need",
      description: "Tell us what service you need and when you need it done.",
    },
    {
      number: "02",
      title: "Choose a Professional",
      description:
        "Browse profiles, compare quotes, and select the best professional for your job.",
    },
    {
      number: "03",
      title: "Book the Service",
      description:
        "Schedule the service and confirm details with your chosen professional.",
    },
    {
      number: "04",
      title: "Get the Job Done",
      description:
        "Your professional arrives on time and completes the work to your satisfaction.",
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          How <span className="text-gradient">FixMate</span> Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Follow these simple steps to get your tasks done effortlessly.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-gradient text-5xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowFixMateWorks;
