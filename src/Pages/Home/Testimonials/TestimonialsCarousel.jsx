import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import AxiosPublic from '../../../Hooks/AxiosPublic';

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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        What Our Clients Say
      </h2>
      {reviews.length === 0 ? (
        <div className="text-center text-gray-500">No reviews available.</div>
      ) : (
        <div className="relative">
          {/* Navigation buttons */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevSlide}
              className="bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          {/* Review Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {visibleReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                {/* User Info */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full">
                    {review.userEmail.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-800">
                      {review.userEmail}
                    </h4>
                    {/* Star Rating */}
                    <div className="flex">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`w-5 h-5 ${
                            starIndex < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Review Content */}
                <p className="text-gray-600">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
