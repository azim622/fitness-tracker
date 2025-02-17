import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Details = () => {
  const trainer = useLoaderData(); // Fetch data from the loader
  const navigate = useNavigate();

  // Check if trainer data is available
  if (!trainer || Object.keys(trainer).length === 0) {
    return <div className="text-center text-red-500 text-lg font-semibold">Error: Trainer data not found.</div>;
  }

  return (
    <div className="p-6  min-h-screen text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6 animate-pulse">{trainer.fullName} - Details</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trainer Info Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-white text-gray-900 shadow-lg rounded-lg p-6"
        >
          <img
            src={trainer.profileImage}
            alt={trainer.fullName}
            className="rounded-full mb-4 w-48 h-48 object-cover mx-auto border-4 border-purple-500 shadow-lg"
          />
          <h2 className="text-3xl font-bold text-center mb-4 text-purple-700">{trainer.fullName}</h2>
          <p className="text-gray-700 mb-2"><strong>Experience:</strong> {trainer.age ? `${trainer.age} years` : "N/A"}</p>
          <p className="text-gray-700 mb-2"><strong>Skills:</strong> {trainer.skills?.length > 0 ? trainer.skills.join(", ") : "N/A"}</p>
          <p className="text-gray-700 mb-2"><strong>Available Days:</strong> {trainer.availableDays?.length > 0 ? trainer.availableDays.join(", ") : "N/A"}</p>
          <p className="text-gray-700 mb-4"><strong>Available Time:</strong> {trainer.availableTime || "N/A"}</p>
          <div className="flex justify-center gap-4">
            {trainer.socialIcons?.facebook && (
              <a href={trainer.socialIcons.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-all">Facebook</a>
            )}
            {trainer.socialIcons?.twitter && (
              <a href={trainer.socialIcons.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-all">Twitter</a>
            )}
            {trainer.socialIcons?.linkedin && (
              <a href={trainer.socialIcons.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition-all">LinkedIn</a>
            )}
            {trainer.socialIcons?.instagram && (
              <a href={trainer.socialIcons.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition-all">Instagram</a>
            )}
          </div>
        </motion.div>

        {/* Available Slots Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white text-gray-900 shadow-lg rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-indigo-600">Available Slots</h2>
          {trainer.availableDays?.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2">
              {trainer.availableDays.map((day, index) => (
                <motion.button
                  key={index}
                  onClick={() => navigate(`/trainer/${trainer._id}`, { state: { day } })}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
                  whileHover={{ scale: 1.1 }}
                >
                  {day} ({trainer.availableTime || "N/A"})
                </motion.button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No slots available</p>
          )}
        </motion.div>
      </div>

      {/* Be A Trainer Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center py-6 mt-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Interested in Becoming a Trainer?</h2>
        <p className="text-white mb-4">Share your expertise and inspire others on their fitness journey.</p>
        <motion.button
          onClick={() => navigate("/applyTrainer")}
          className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-700 hover:text-white transition-all shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          Become a Trainer
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Details;
