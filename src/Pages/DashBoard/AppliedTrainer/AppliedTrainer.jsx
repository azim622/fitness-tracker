import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FcApprove } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AppliedTrainer = () => {
  const [appliedTrainers, setAppliedTrainers] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  // Fetch applied trainers from the backend
  // useEffect(() => {
  //   fetch('https://fitness-tracker-server-orcin.vercel.app/apply') // Update with the actual backend URL
  //     .then((response) => response.json())
  //     .then((data) => setAppliedTrainers(data))
  //     .catch((error) => console.error('Error fetching trainers:', error));
  // }, []);

  const { data: apply_trainer = [], refetch } = useQuery({
    queryKey: ["apply_trainer", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/applyTrainer");
      return res.data;
    },
  });

  // Handle approve trainer
  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/apply/${id}`);
      const data = await res.data;
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: 'Trainer added successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle reject trainer
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

         const fetchData= async()=>{
          try{

            
          
          const res = await axiosSecure.patch(`/rejectApply/${id}`);
          const data = await res.data;
          console.log(data)
          if(data.modifiedCount>0){

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });

          }
          
          
          // refetch();
        } catch (error) {
          console.log(error);
        }

         }
         fetchData()
        
       
      }
    });
    console.log(id);
  };

  return (
    <div>
      <section className="mx-auto py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-indigo-800 mb-8 text-center">
            Applied Trainers
          </h2>

          <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            <thead>
              <tr>
                <th className="py-2 px-4 text-left font-medium text-gray-700">
                  Image
                </th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">
                  Name
                </th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">
                  Email
                </th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">
                  Approve
                </th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">
                  Reject
                </th>
              </tr>
            </thead>
            <tbody>
              {apply_trainer.map((trainer) => (
                <tr key={trainer._id}>
                  <td className="py-3 px-4">
                    <img
                      src={trainer.profileImage}
                      alt={trainer.fullName}
                      className="w-16 h-16 rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4">{trainer.fullName}</td>
                  <td className="py-3 px-4">{trainer.email}</td>
                 
                  <td className="py-3 px-4">
                    <button onClick={() => handleApprove(trainer._id)}>
                      <FcApprove size={24} />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => handleReject(trainer._id)}>
                      <MdDelete size={24} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </section>
    </div>
  );
};

export default AppliedTrainer;
