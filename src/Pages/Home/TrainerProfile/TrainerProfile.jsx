import { useQuery } from "@tanstack/react-query";
import React from "react";
import AxiosPublic from "../../../Hooks/AxiosPublic";

const TrainerProfile = () => {
  const axiosPublic = AxiosPublic();

  // Fetch data using React Query and Axios
  const { data: trainers = [], isLoading, error } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trainerProfile");
      return res.data;
    },
  });

  // Check if data is loading or if there is an error
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="px-4 py-10 max-w-screen-lg mx-auto">
      <h1 className="text-4xl text-center font-bold text-gray-800 mb-10">
        Meet Our Fitness Experts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(trainers) &&
          trainers.map((trainer, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105"
            >
              <div className="p-6 text-center">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-teal-400"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {trainer.name}
                </h2>
                <p className="text-gray-600 italic mb-4">{trainer.bio}</p>
                <ul className="space-y-2">
                  {trainer.expertise?.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-lg text-gray-700 hover:text-teal-400 cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrainerProfile;
