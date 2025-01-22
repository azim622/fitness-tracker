import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2"; // For confirmation prompts

const SlotsList = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch slots data
  const { data: slots = [], isLoading, isError, error } = useQuery({
    queryKey: ["slots"],
    queryFn: async () => {
      const response = await axiosSecure.get("/slots");
      return response.data;
    },
  });

  // Mutation to delete a slot
  const deleteSlotMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/slots/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]); // Refresh slot data after deletion
      Swal.fire("Deleted!", "The slot has been deleted.", "success");
    },
    onError: (error) => {
      Swal.fire("Error", error.message || "Failed to delete slot.", "error");
    },
  });

  const handleDelete = (slotId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this slot? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSlotMutation.mutate(slotId);
      }
    });
  };

  if (isLoading) return <p>Loading slots...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Available Slots</h2>
      {slots.length === 0 ? (
        <p>No slots available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-4 py-2">Slot Name</th>
              <th className="border border-gray-300 px-4 py-2">Slot Time</th>
              <th className="border border-gray-300 px-4 py-2">Selected Days</th>
              <th className="border border-gray-300 px-4 py-2">Class</th>
              <th className="border border-gray-300 px-4 py-2">Trainer Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot._id} className="border-t">
                <td className="border border-gray-300 px-4 py-2">{slot.slotName || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{slot.slotTime || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.selectedDays?.join(", ") || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">{slot.selectedClass || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{slot.trainerEmail || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(slot._id)}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SlotsList;
