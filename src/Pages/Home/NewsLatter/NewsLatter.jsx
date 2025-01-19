import React, { useState } from "react";
import { motion } from "framer-motion";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const NewsLatter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const axiosSecure = UseAxiosSecure();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSecure.post("/newsLatter", { name, email });
      if (response.data.message) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "NewsLatter Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setName(""); // Reset fields
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-indigo-100 via-purple-200 to-cyan-100 py-20">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8 flex flex-col items-center justify-center space-y-12 lg:space-y-0 lg:flex-row lg:gap-12">
          {/* Left Side: Image or Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            {/* Add any image or icon if needed */}
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto"
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-indigo-700 sm:text-4xl">
                Join Our{" "}
                <span className="text-cyan-600">Newsletter</span>
              </h2>
              <p className="mt-4 text-gray-600 text-lg sm:text-xl">
                Get exclusive fitness tips, updates, and exciting offers!
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                />
              </div>

              {/* Subscribe Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-indigo-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
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
