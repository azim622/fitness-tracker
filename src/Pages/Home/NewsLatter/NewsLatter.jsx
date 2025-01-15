import React, { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const NewsLatter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  const handleSubscribe = async (e) => {
    e.preventDefault();  // Prevent form submission
    try {
      const response = await axiosSecure.post("/newsLatter", { name, email });
      if (response.data.message) {
        alert(response.data.message);  // Show success/error message from backend
      }
      setName(""); // Clear input fields
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-cyan-50 py-16">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <img
              src="https://i.ibb.co/Zz4s3RM/newsletter-illustration.png"
              alt="Newsletter Illustration"
              className="w-full max-w-md mx-auto lg:max-w-lg"
            />
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-indigo-800 sm:text-5xl">
                Subscribe to Our{" "}
                <span className="text-cyan-600">Newsletter</span>
              </h2>
              <p className="mt-4 text-gray-600 text-lg">
                Stay informed with fitness tips, exclusive deals, and more. Join
                our community today!
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name }
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email }
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Subscribe Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-indigo-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Subscribe Now
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewsLatter;
