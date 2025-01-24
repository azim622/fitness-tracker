import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

const TestimonialsCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/reviews");

        console.log("Response data:", response.data);

        if (response.data && response.data.reviews) {
          setReviews(response.data.reviews);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        } else {
          throw new Error("Reviews data is missing");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentPage]);

  console.log("Reviews:", reviews);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <button className="slick-next">Next</button>,
    prevArrow: <button className="slick-prev">Prev</button>,
    responsive: [
      {
        breakpoint: 1024, // For smaller screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // For mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-6">What Our Users Say</h2>
      <Slider {...settings}>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="p-6 bg-white rounded-lg shadow-lg mx-3 flex flex-col items-center"
            >
              <div className="text-yellow-500 text-lg mb-4">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">
                {review.userEmail}
              </h3>
              {/* Unescape the quotes and render the review text properly */}
              <p className="text-gray-600 text-sm text-center">
                {review.review.replace(/\\n/g, ' ').replace(/\\"/g, '"')}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </Slider>
      <div className="flex justify-between mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Prev
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
