import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import AxiosPublic from "../../../Hooks/AxiosPublic";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialsCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const axiosPublic = AxiosPublic();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosPublic.get("/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-bold text-center mb-12  text-gray-800 p-3 rounded-lg">
        What Our Clients Say
      </h2>
      {reviews.length === 0 ? (
        <div className="text-center text-gray-500">No reviews available.</div>
      ) : (
        <div className="relative">
          {/* Navigation buttons */}
          <div className=" flex justify-between items-center mb-6">
            <button
            
              onClick={prevSlide}
              className="bg-purple-500 p-3 rounded-full shadow-lg hover:bg-purple-600 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-pink-500 p-3 rounded-full shadow-lg hover:bg-pink-600 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Review Grid with Animation */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleReviews.map((review, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {/* User Info */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-400 text-gray-900 flex items-center justify-center rounded-full font-semibold">
                      {review.userEmail.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold">{review.userEmail}</h4>
                      {/* Star Rating */}
                      <div className="flex">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-5 h-5 ${
                              starIndex < review.rating ? "text-yellow-300" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Review Content */}
                  <p className="text-gray-200">{review.review}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;