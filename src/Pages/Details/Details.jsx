import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Details = () => {
  const trainer = useLoaderData(); // Fetch data from the loader
  const navigate = useNavigate();

  // Check if trainer data is available
  if (!trainer || Object.keys(trainer).length === 0) {
    return <div>Error: Trainer data not found.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trainer Info Section */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <img
            src={trainer.profileImage}
            alt={trainer.fullName}
            className="rounded-lg mb-4 w-full h-64 object-cover"
          />
          <h1 className="text-3xl font-bold mb-4">{trainer.fullName}</h1>
          <p className="text-gray-700 mb-2">
            <strong>Experience:</strong> {trainer.age ? `${trainer.age} years` : "N/A"}
          </p>
          <div className="text-gray-700 mb-4">
            <strong>Skills:</strong> {trainer.skills && trainer.skills.length > 0 ? trainer.skills.join(", ") : "N/A"}
          </div>
          <p className="text-gray-700 mb-2">
            <strong>Available Days:</strong> {trainer.availableDays && trainer.availableDays.length > 0 ? trainer.availableDays.join(", ") : "N/A"}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Available Time:</strong> {trainer.availableTime || "N/A"}
          </p>
          <div className="flex gap-4">
            {trainer.socialIcons?.facebook && (
              <a
                href={trainer.socialIcons.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                Facebook
              </a>
            )}
            {trainer.socialIcons?.twitter && (
              <a
                href={trainer.socialIcons.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                Twitter
              </a>
            )}
            {trainer.socialIcons?.linkedin && (
              <a
                href={trainer.socialIcons.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700"
              >
                LinkedIn
              </a>
            )}
            {trainer.socialIcons?.instagram && (
              <a
                href={trainer.socialIcons.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500"
              >
                Instagram
              </a>
            )}
          </div>
        </div>

        {/* Available Slots Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
          {trainer.availableDays && trainer.availableDays.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {trainer.availableDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() =>
                    navigate(`/trainer/${trainer._id}`, { state: { day } })
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  {day} ({trainer.availableTime || "N/A"})
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No slots available</p>
          )}
        </div>
      </div>

      {/* Be A Trainer Section */}
      <div className="bg-gray-100 text-center py-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Interested in Becoming a Trainer?</h2>
        <p className="text-gray-700 mb-4">
          Share your expertise and inspire others on their fitness journey.
        </p>
        <button
          onClick={() => navigate("/applyTrainer")}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Become a Trainer
        </button>
      </div>
    </div>
  );
};

export default Details;
