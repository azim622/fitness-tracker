import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AllTrainer = () => {
    const [trainers, setTrainers] = useState([]);
    const navigate = useNavigate();
  
    // Fetch trainer data
    useEffect(() => {
      axios
        .get("http://localhost:5000/trainer") // Replace with your actual API endpoint
        .then((response) => setTrainers(response.data))
        .catch((error) => console.error("Error fetching trainer data:", error));
    }, []);
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Our Trainers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
            >
              <img
                src={trainer.profileImage}
                alt={trainer.trainerName}
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
              <h2 className="text-xl font-bold mb-2">{trainer.trainerName}</h2>
              <p className="text-gray-700 mb-2">
                <strong>Experience:</strong> {trainer.yearsOfExperience} years
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Available Slots:</strong>{" "}
                {trainer.availableSlots
                  .map((slot) => `${slot.day} (${slot.time})`)
                  .join(", ")}
              </p>
              <p className="text-gray-700 mb-4">{trainer.otherInfo}</p>
              <div className="flex gap-4 mb-4">
                {trainer.socialIcons.facebook && (
                  <a
                    href={trainer.socialIcons.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    <FaFacebook />
                  </a>
                )}
                {trainer.socialIcons.twitter && (
                  <a
                    href={trainer.socialIcons.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    <FaTwitter></FaTwitter>
                  </a>
                )}
                {trainer.socialIcons.linkedin && (
                  <a
                    href={trainer.socialIcons.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700"
                  >
                    <FaLinkedin></FaLinkedin>
                  </a>
                )}
                {trainer.socialIcons.instagram && (
                  <a
                    href={trainer.socialIcons.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500"
                  >
                    <FaInstagram></FaInstagram>
                  </a>
                )}
              </div>
              <Link to={`/details/${trainer._id}`}  className="bg-blue-500 mx-auto text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Read More

              </Link>
            </div>
          ))}
        </div>
      </div>
    );
};

export default AllTrainer;