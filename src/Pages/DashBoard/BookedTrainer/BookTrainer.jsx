import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

// Star rating component
const StarRating = ({ rating, onRatingChange }) => {
  const handleStarClick = (starIndex) => {
    if (onRatingChange) {
      onRatingChange(starIndex + 1); // Star index starts from 0, so we add 1
    }
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          onClick={() => handleStarClick(index)}
          xmlns="http://www.w3.org/2000/svg"
          fill={index < rating ? "yellow" : "gray"}
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="cursor-pointer"
        >
          <path d="M12 .587l3.668 7.431 8.199 1.19-5.914 5.768 1.392 8.118-7.545-3.97-7.547 3.97 1.394-8.118-5.916-5.768 8.199-1.19z" />
        </svg>
      ))}
    </div>
  );
};

// Modal component
const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (rating && review) {
      onSubmit({ rating, review });
      setRating(0);
      setReview("");
    } else {
      alert("Please provide both a rating and a review.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
        <div>
          <label className="block text-sm font-medium mb-2">Rating:</label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 mt-4">Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="4"
            className="w-full p-2 border rounded-lg mb-4"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

const BookTrainer = () => {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const response = await axiosSecure.get(`/payments?email=${user.email}`);
        if (response.data && response.data.length > 0) {
          const bookingDetails = response.data[0];
          setTrainer({
            name: bookingDetails.trainerName,
            email: bookingDetails.trainerEmail,
            profileImage: bookingDetails.profileImage || "default-image.jpg",
            bio: bookingDetails.bio || "No bio available.",
            classes: bookingDetails.classes || [],
            slots: bookingDetails.slots || [],
            rating: bookingDetails.rating || 0,
            reviews: bookingDetails.reviews || [],
          });
        } else {
          setTrainer(null);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch trainer details.");
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchTrainerDetails();
    }
  }, [axiosSecure, user?.email]);

  const handleReviewSubmit = async ({ rating, review }) => {
    try {
      // Prepare the data for the POST request
      const reviewData = {
        userEmail: user.email,
        trainerEmail: trainer.email, // Assuming trainer email is part of the trainer object
        rating,
        review,
      };
  
      // Send the review to the backend
      const response = await axiosSecure.post("/reviews", reviewData);
      console.log("Review submitted:", response.data);
  
      // Optionally update the frontend with the new review
      setTrainer((prev) => ({
        ...prev,
        rating,
        reviews: [...prev.reviews, { rating, review }], // Add the new review locally
      }));
  
      // Show a SweetAlert for success
      Swal.fire({
        icon: "success",
        title: "Review Submitted",
        text: "Your review has been successfully submitted!",
        showConfirmButton: true,
        confirmButtonColor: "#4CAF50",
      });
  
      // Close the modal after submission
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an issue submitting your review. Please try again later.",
        showConfirmButton: true,
        confirmButtonColor: "#f44336",
      });
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!trainer) return <p>No bookings found for this user.</p>;

  return (
    <div className="container mx-auto my-8 p-6 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-lg shadow-xl">
      <Fade bottom>
        <h1 className="text-4xl font-bold text-center text-white mb-6">Trainer Details</h1>
      </Fade>

      <section className="flex items-center mb-6 bg-white p-4 rounded-lg shadow-lg">
        <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-purple-600 mr-6">
          <img
            src={trainer.profileImage || "default-image.jpg"}
            alt="Trainer"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{trainer.name || "Unknown Trainer"}</h2>
          <p className="text-sm text-gray-600">{trainer.bio}</p>
        </div>
      </section>

      <section className="mb-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Classes Info</h2>
        <ul>
          {trainer.classes.length > 0 ? (
            trainer.classes.map((classInfo, index) => (
              <li key={index} className="text-gray-600">
                <strong>Class Name:</strong> {classInfo.name} - <strong>Duration:</strong> {classInfo.duration} mins
              </li>
            ))
          ) : (
            <p>No classes available.</p>
          )}
        </ul>
      </section>

      <section className="mb-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Slot Info</h2>
        <ul>
          {trainer.slots.length > 0 ? (
            trainer.slots.map((slot, index) => (
              <li key={index} className="text-gray-600">{slot}</li>
            ))
          ) : (
            <p>No slots available.</p>
          )}
        </ul>
      </section>

      {/* <section className="mb-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Ratings & Reviews</h2>
        <div>
          <strong>Rating: </strong>
          <StarRating rating={trainer.rating} />
        </div>
        <div>
          <strong>Reviews:</strong>
          {trainer.reviews.length > 0 ? (
            <ul>
              {trainer.reviews.map((rev, index) => (
                <li key={index} className="text-gray-600">
                  <strong>Rating:</strong> {rev.rating} - <strong>Review:</strong> {rev.review}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </section> */}

      <Fade bottom>
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-all duration-200"
          >
            Leave a Review
          </button>
        </div>
      </Fade>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default BookTrainer;
