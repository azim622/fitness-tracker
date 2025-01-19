import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLoaderData } from "react-router-dom";

const BookList = () => {
  // Fetch trainer data from loader
  const trainer = useLoaderData();

  // Check if trainer data is available
  if (!trainer) {
    return <div>Error: Trainer data not found.</div>;
  }

  const { data: trainers = [] } = useQuery({
    queryKey: ['trainer',],
    queryFn: async () => {
      const res = await axiosSecure.get('/addClass');
      return res.data;
    },
  });

  return (
    <div className="trainer-details container mx-auto p-6">
      {/* Trainer Header */}
      <div className="trainer-header flex flex-col md:flex-row items-center gap-4 mb-8">
        <img
          src={trainer.profileImage || "/default-profile.jpg"} // Use a default image if not provided
          alt={trainer.fullName || "Trainer"}
          className="w-32 h-32 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {trainer.fullName || "Trainer Name"}
          </h2>
          <p className="text-gray-600">Email: {trainer.email || "N/A"}</p>
          <p className="text-gray-600">
            Available Time: {trainer.availableTime || "Not specified"}
          </p>
          <p className="text-gray-600">
            Available Days:{" "}
            {trainer.availableDays?.length > 0
              ? trainer.availableDays.join(", ")
              : "Not specified"}
          </p>
        </div>
      </div>

      {/* Classes Section */}
      <div className="classes-section mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Classes</h3>
        {trainer.classes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.classes.map((classItem) => (
              <div
                key={classItem._id}
                className="class-card border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={classItem.image || "/default-class.jpg"} // Use default image if not available
                  alt={classItem.className || "Class"}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  {classItem.className || "Class Name"}
                </h4>
                <p className="text-gray-600 text-sm">
                  {classItem.details || "No details provided"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No classes available.</p>
        )}
      </div>

      {/* Membership Packages Section */}
      <div className="membership-section">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Membership Packages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainer.membershipPackages?.map((packageItem, index) => (
            <div
              key={index}
              className="package-card border rounded-lg p-4 shadow-sm hover:shadow-md transition"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;
