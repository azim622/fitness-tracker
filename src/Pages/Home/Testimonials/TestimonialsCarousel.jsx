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

  // Responsive Cards Logic
  const getVisibleReviews = () => {
    if (window.innerWidth >= 1024) return reviews.slice(currentIndex, currentIndex + 3); // Laptop (3)
    if (window.innerWidth >= 768) return reviews.slice(currentIndex, currentIndex + 2); // Tablet (2)
    return reviews.slice(currentIndex, currentIndex + 1); // Mobile (1)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 relative flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">What Our Clients Say</h2>
      {reviews.length === 0 ? (
        <div className="text-center text-gray-500">No reviews available.</div>
      ) : (
        <div className="relative flex items-center w-full">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 bg-purple-500 p-3 rounded-full shadow-lg hover:bg-purple-600 transition-all z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Cards */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            >
              {getVisibleReviews().map((review, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 w-full h-[250px] flex flex-col justify-between"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-yellow-400 text-gray-900 flex items-center justify-center rounded-full font-semibold">
                      {review.userEmail.charAt(0).toUpperCase()}
                    </div>
                    <h4 className="font-semibold mt-2">{review.userEmail}</h4>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`w-5 h-5 ${
                            starIndex < review.rating ? "text-yellow-300" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-200 mt-4 line-clamp-3">{review.review}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 bg-pink-500 p-3 rounded-full shadow-lg hover:bg-pink-600 transition-all z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
