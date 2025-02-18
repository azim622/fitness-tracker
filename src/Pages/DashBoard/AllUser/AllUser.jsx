import React from "react";
import { FaUsers } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUser = () => {
  const axiosSecure = UseAxiosSecure();

  // Fetch users data
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res?.data;
    },
  });

  // Handle user deletion
  const handleDeleteUser = (user) => {
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
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "User has been deleted.", "success");
              refetch();
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the user.", "error");
          });
      }
    });
  };

  // Handle making a user a trainer or admin
  const handleRoleChange = (user, newRole) => {
    if (user.role === newRole) {
      Swal.fire("Info", `${user.name} is already a ${newRole}!`, "info");
      return;
    }

    axiosSecure.patch(`/users/${newRole}/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now a ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-6 overflow-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">All Users</h2>
        <h2 className="text-2xl md:text-3xl font-bold">Total Users: {users.length}</h2>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table-auto w-full text-left text-sm md:text-lg border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-orange-400 text-white text-sm md:text-xl font-semibold">
              <th className="py-2 md:py-3 px-2 md:px-4">#</th>
              <th className="py-2 md:py-3 px-2 md:px-4">Name</th>
              <th className="py-2 md:py-3 px-2 md:px-4">Email</th>
              <th className="py-2 md:py-3 px-2 md:px-4">Role</th>
              <th className="py-2 md:py-3 px-2 md:px-4">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100 text-sm md:text-lg">
                <td className="py-2 md:py-3 px-2 md:px-4 text-center">{index + 1}</td>
                <td className="py-2 md:py-3 px-2 md:px-4">{user.name}</td>
                <td className="py-2 md:py-3 px-2 md:px-4">{user.email}</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                  {user.role === "admin" ? (
                    "Admin"
                  ) : user.role === "trainer" ? (
                    "Trainer"
                  ) : (
                    <select
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                      className="bg-orange-500 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-md"
                    >
                      <option value="member">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="trainer">Trainer</option>
                    </select>
                  )}
                </td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-sm btn-ghost bg-red-600 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-md hover:bg-red-700"
                  >
                    <MdDelete /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
