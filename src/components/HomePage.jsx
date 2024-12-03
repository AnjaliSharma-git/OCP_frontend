import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-t from-purple-400 to-pink-50 min-h-screen mt-0">
      <header className="relative  text-gray-800 py-16 px-4 text-center h-[500px] pt-[150px]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Feel Better. <span className="text-pink-500">Live Better.</span>
          </h1>
          <p className="text-lg font-medium text-gray-700">
            Your mental wellness is just a step away. Let's get started!
          </p>
          <p className="text-lg mb-6">
            Join thousands of happy clients who’ve found peace and clarity with
            our services.
          </p>
          <div className="mt-6">
            <a
              href="https://online-counseling-platform.netlify.app/signup"
              className="bg-pink-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-md hover:bg-pink-600 transition">
              Get Started
            </a>
          </div>
        </div>
      </header>

      <section className="py-16 px-4 mt-[70px] ">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6 text-yellow-600">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Licensed Counselors",
                description: "Connect with certified and experienced professionals.",
                emoji: "🎓",
              },
              {
                title: "Affordable Plans",
                description: "We offer competitive pricing for all services.",
                emoji: "💰",
              },
              {
                title: "Flexible Scheduling",
                description: "Book appointments at times that suit your schedule.",
                emoji: "⏰",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="text-5xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-bold text-pink-500 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-200 py-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm mb-2">
            &copy; {new Date().getFullYear()} Online Counseling Platform. Spread
            Happiness!
          </p>

        </div>
      </footer>
    </div>
  );
};

export default HomePage;
