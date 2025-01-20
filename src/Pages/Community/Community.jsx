import React, { useState } from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const Community = () => {
  const axiosSecure = UseAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: forumData, refetch } = useQuery({
    queryKey: ['forums', currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forums?page=${currentPage}&limit=6`);
      return res.data;
    },
    keepPreviousData: true, // Keep previous data while fetching new page
  });

  const handleLike = async (id) => {
    const res = await axiosSecure.patch(`/increase-upvote/${id}`);
    const data = res.data;
    if (data.modifiedCount > 0) {
      refetch();
    }
  };

  const handleDislike = async (id) => {
    const res = await axiosSecure.patch(`/increase-downVote/${id}`);
    const data = res.data;
    if (data.modifiedCount > 0) {
      refetch();
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h3 className="text-center text-3xl font-semibold mb-8">Forum</h3>

      {/* Display Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {forumData?.forums.map((forum) => (
          <div
            key={forum._id}
            className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
          >
            <h4 className="text-2xl text-gray-800">{forum.title}</h4>
            <p className="text-gray-600 leading-relaxed mt-4">{forum.content}</p>

            {/* Voting System */}
            <div className="flex gap-4 items-center mt-4">
              <button
                onClick={() => handleLike(forum._id)}
                className="bg-gray-100 flex gap-2 items-center hover:bg-gray-200 p-3 rounded-full transition-colors"
              >
                <AiFillLike size={20} color="#2ecc71" />
                <h2>{forum?.upVote > 0 ? forum?.upVote : 0}</h2>
              </button>
              <button
                onClick={() => handleDislike(forum._id)}
                className="bg-gray-100 flex gap-2 items-center hover:bg-gray-200 p-3 rounded-full transition-colors"
              >
                <AiFillDislike size={20} color="#e74c3c" />
                {forum?.downVote > 0 ? forum?.downVote : 0}
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500">Posted by: {forum.author}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
          disabled={forumData?.currentPage === 1}
          onClick={() => handlePageChange(forumData?.currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-lg text-gray-700">
          Page {forumData?.currentPage} of {forumData?.totalPages}
        </span>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
          disabled={forumData?.currentPage === forumData?.totalPages}
          onClick={() => handlePageChange(forumData?.currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Community;
