import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet";

const AllTrainer = () => {
  const axiosSecure = UseAxiosSecure();
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: trainers = [] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allTrainer");
      return res.data;
    },
  });

  const sortedTrainers = [...trainers].sort((a, b) => {
    return sortOrder === "asc" ? a.age - b.age : b.age - a.age;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Trainer || FitTracker</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8">Our Trainers</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Sort by Experience ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTrainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
          >
            {/* Trainer Image */}
            <img
              src={trainer.profileImage}
              alt={trainer.fullName}
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />

            {/* Trainer Name */}
            <h2 className="text-xl font-bold mb-2">{trainer.fullName}</h2>

            {/* Trainer Skills */}
            <p className="text-gray-700 mb-2">
              <strong>Skills:</strong> {trainer.skills?.join(", ") || "Not available"}
            </p>

            {/* Available Days */}
            <p className="text-gray-700 mb-2">
              <strong>Available Days:</strong> {trainer.availableDays?.join(", ") || "Not available"}
            </p>

            {/* Available Time */}
            <p className="text-gray-700 mb-2">
              <strong>Available Time:</strong> {trainer.availableTime || "Not available"}
            </p>

            {/* Age */}
            <p className="text-gray-700 mb-2">
              <strong>Experience:</strong> {trainer.age ? trainer.age : "Not provided"} years
            </p>

            {/* Details Link */}
            <Link
              to={`/details/${trainer._id}`}
              className="bg-blue-500 mx-auto text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrainer;
