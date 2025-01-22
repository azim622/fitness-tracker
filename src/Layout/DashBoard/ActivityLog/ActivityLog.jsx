import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import useAuth from "../../../Hooks/UseAuth";

const ActivityLog = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth(); // Replace with actual user data
  const [selectedTrainer, setSelectedTrainer] = useState(null); // For modal

  const { data: trainers = [] } = useQuery({
    queryKey: ["trainers", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/apply?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-center text-3xl font-bold my-8">Activity Log</h2>
      <h2 className="text-xl font-bold mb-4">Trainers for {user.email}</h2>
      <table border="1" cellPadding="10" className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer._id}>
              <td className="border px-4 py-2">
                <img
                  src={trainer.profileImage}
                  alt={trainer.fullName}
                  width="50"
                  height="50"
                  className="rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{trainer.fullName}</td>
              <td className="border px-4 py-2">{trainer.email}</td>
              <td className="border px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    trainer.status === "pending"
                      ? "bg-yellow-500"
                      : trainer.status === "approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {trainer.status}
                </span>
              </td>
              <td className="border px-4 py-2">
                {trainer.status === "rejected" && (
                  <button
                    onClick={() => setSelectedTrainer(trainer)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedTrainer && (
         <div
         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
         onClick={() => setSelectedTrainer(null)} // Close modal on overlay click
       >
         <div
           className="bg-white shadow-lg rounded-lg p-6 w-1/3 relative"
           onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
         >
           <div className="flex items-center justify-between">
             <h3 className="text-2xl font-semibold text-gray-800">
               Application Rejection
             </h3>
             <button
               onClick={() => setSelectedTrainer(null)}
               className="text-gray-400 hover:text-gray-600"
             >
               ✕
             </button>
           </div>
     
           <div className="mt-4 flex flex-col items-center">
             <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
               <FaTrashAlt className="text-red-500 text-3xl" />
             </div>
             <p className="mt-4 text-center text-gray-600">
               Sorry, <strong>{selectedTrainer.fullName}</strong>, your application
               has been rejected due to fitness-related issues.
             </p>
           </div>
     
           <div className="mt-6 text-center">
             <p className="text-gray-500 italic">
               For any questions, feel free to contact our support team.
             </p>
           </div>
     
           <div className="mt-6 flex justify-center">
             <button
               onClick={() => setSelectedTrainer(null)}
               className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
             >
               Close
             </button>
           </div>
         </div>
       </div>
      )}
    </div>
  );
};

export default ActivityLog;
