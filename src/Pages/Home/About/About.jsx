import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-50 via-blue-100 to-cyan-50 py-16">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-blue-800 sm:text-5xl">
            About <span className="text-blue-600">FitTrack</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Your ultimate fitness companion. Elevate your workouts and track
            your progress effortlessly with our cutting-edge tools.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://i.ibb.co.com/5Bd86KQ/mcp-portable-fitness-exercise-bands-with-handles-home-workout-and-gym-fitness-11-pcs-500x500.webp"
              alt="About Us"
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-lg blur-lg"></div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gray-700"
          >
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              Our Mission
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              At <span className="text-blue-600 font-bold">FitTrack</span>, we
              believe fitness should be accessible and enjoyable for everyone.
              We are committed to providing a seamless platform that combines
              real-time tracking, data-driven insights, and motivational tools
              to empower your fitness journey.
            </p>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              Why Choose FitTrack
            </h3>
            <p className="text-lg leading-relaxed">
              With a user-first approach, we offer innovative features that go
              beyond tracking. Our platform is designed to keep you motivated,
              inspired, and connected with a community of fitness enthusiasts
              worldwide.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
