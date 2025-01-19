import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import useAuth from '../../../Hooks/UseAuth';

const ActivityLog = () => {
  const axiosSecure = UseAxiosSecure();
  const {user} = useAuth() // Replace with actual user data

  const { data: trainers = [] } = useQuery({
    queryKey: ['trainers', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/apply?email=${user.email}`);
      return res.data;
    },
  });
  

  return (
    <div>
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
                    trainer.status === 'pending'
                      ? 'bg-yellow-500'
                      : trainer.status === 'approved'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                >
                  {trainer.status}
                </span>
              </td>
              <td className="border px-4 py-2">
                {
                    trainer.status==="rejected"?<FaEye />:undefined
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLog;
