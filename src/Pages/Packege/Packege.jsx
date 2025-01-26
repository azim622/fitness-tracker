// Packege.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Packege = ({ slot }) => {
  const navigate = useNavigate();

  const handleJoinNow = (selectedPackage) => {
    navigate("/payment", {
      state: { trainer: slot.trainer, selectedPackage, slot },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="membership-section mb-8"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Membership Packages
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "Basic Membership",
            benefits: [
              "Access to gym facilities during regular operating hours",
              "Use of cardio and strength training equipment",
            ],
            price: 10,
          },
          {
            name: "Standard Membership",
            benefits: [
              "All benefits of the basic membership",
              "Access to group fitness classes such as yoga, spinning, and Zumba",
            ],
            price: 50,
          },
          {
            name: "Premium Membership",
            benefits: [
              "All benefits of the standard membership",
              "Access to personal training sessions with certified trainers",
              "Use of additional amenities like a sauna or steam room",
              "Discounts on additional services such as massage therapy or nutrition counseling",
            ],
            price: 100,
          },
        ].map((packageItem, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="package-card border rounded-lg p-4 shadow-lg hover:shadow-xl transition-transform hover:scale-105 bg-gradient-to-r from-white to-blue-50"
          >
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              {packageItem.name}
            </h4>
            <ul className="text-gray-600 text-sm mb-4 list-disc pl-4">
              {packageItem.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
            <p className="text-gray-800 font-bold text-lg">
              ${packageItem.price}
            </p>
            <button
              onClick={() => handleJoinNow(packageItem)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            >
              Join Now
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Packege;