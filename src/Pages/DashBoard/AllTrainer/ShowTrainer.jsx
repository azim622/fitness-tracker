import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const ShowTrainer = () => {
  const axiosSecure = UseAxiosSecure();

  // Fetch the trainers from the backend
  const { data: trainers = [], refetch } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allTrainer");
      return res.data;
    },
  });

  const handleDeleteTrainer = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Correct URL for the delete endpoint with the trainer's ID
        axiosSecure
          .delete(`/allTrainer/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "The trainer has been deleted.",
                icon: "success",
              });
              refetch(); // Refresh the trainer data
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the trainer.",
              icon: "error",
            });
            console.error(error);
          });
      }
    });
  };

  return (
    <div>
      <h2>All Trainers</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Image</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer._id}>
              <td>
                <img
                  src={trainer.profileImage}
                  alt={trainer.fullName}
                  width="50"
                  height="50"
                  className="rounded-full"
                />
              </td>
              <td>{trainer.fullName}</td>
              <td>{trainer.email}</td>
              <td>
                <button onClick={() => handleDeleteTrainer(trainer._id)}>
                  <FaDeleteLeft />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTrainer;
