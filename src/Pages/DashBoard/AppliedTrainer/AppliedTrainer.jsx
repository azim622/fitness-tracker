import React from "react";
import { motion } from "framer-motion";
import { FcApprove } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AppliedTrainer = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: apply_trainer = [], refetch } = useQuery({
    queryKey: ["apply_trainer"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applyTrainer");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/apply/${id}`);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Trainer approved successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/rejectApply/${id}`);
          if (res.data.modifiedCount > 0) {
            Swal.fire("Deleted!", "Trainer application has been rejected.", "success");
            refetch();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="mx-auto py-8 px-4 md:px-6 lg:px-8 max-w-6xl">
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-6 text-center">
        Applied Trainers
      </h2>
      <div className="overflow-x-auto">
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full border border-gray-200 rounded-lg shadow-lg text-sm md:text-base"
        >
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-center">Approve</th>
              <th className="py-2 px-4 text-center">Reject</th>
            </tr>
          </thead>
          <tbody>
            {apply_trainer.map((trainer) => (
              <tr key={trainer._id} className="border-t">
                <td className="py-3 px-4">
                  <img
                    src={trainer.profileImage}
                    alt={trainer.fullName}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4">{trainer.fullName}</td>
                <td className="py-3 px-4">{trainer.email}</td>
                <td className="py-3 px-4 text-center">
                  <button onClick={() => handleApprove(trainer._id)}>
                    <FcApprove size={20} />
                  </button>
                </td>
                <td className="py-3 px-4 text-center">
                  <button onClick={() => handleReject(trainer._id)}>
                    <MdDelete size={20} className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default AppliedTrainer;
