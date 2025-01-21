import React, { useState } from "react";
import { AiFillAlert, AiFillAlipaySquare, AiFillDislike, AiFillLike } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet";
import useAuth from "../../Hooks/UseAuth";
import AxiosPublic from "../../Hooks/AxiosPublic";

const Community = () => {
  const axiosPublic = AxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: forumData, refetch } = useQuery({
    queryKey: ["forums", currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/forums?page=${currentPage}&limit=6`);
      return res.data;
    },
    keepPreviousData: true, // Keep previous data while fetching new page
  });

  const handleLike = async (id) => {
    const res = await axiosPublic.patch(`/increase-upvote/${id}`);
    const data = res.data;
    if (data.modifiedCount > 0) {
      refetch();
    }
  };

  const handleDislike = async (id) => {
    const res = await axiosPublic.patch(`/increase-downVote/${id}`);
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Community || FitTracker</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h3 className="text-center text-4xl font-bold mb-8 text-gray-800">
        Forum
      </h3>

      {/* Display Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {forumData?.forums.map((forum) => (
          <div
            key={forum._id}
            className="bg-white rounded-lg shadow-xl p-6 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <img
              src={forum.photoURL} // Change this to the correct field
              alt="Forum Post"
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <h4 className="text-2xl font-semibold text-gray-800 mb-4">
              {forum.title}
            </h4>
            <p className="text-gray-600 leading-relaxed mb-4">
              {forum.content.length > 150
                ? `${forum.content.substring(0, 150)}...`
                : forum.content}
            </p>

            {/* Voting System */}
            <div className="flex gap-6 items-center mt-4">
              <button
                onClick={() => handleLike(forum._id)}
                className="bg-green-100 flex gap-2 items-center hover:bg-green-200 p-3 rounded-full transition-colors"
              >
                <AiFillLike size={22} color="#2ecc71" />
                <span>{forum?.upVote > 0 ? forum?.upVote : 0}</span>
              </button>
              <button
                onClick={() => handleDislike(forum._id)}
                className="bg-red-100 flex gap-2 items-center hover:bg-red-200 p-3 rounded-full transition-colors"
              >
                <AiFillDislike size={22} color="#e74c3c" />
                <span>{forum?.downVote > 0 ? forum?.downVote : 0}</span>
              </button>
            </div>

            <p className="mt-6 flex text-sm text-gray-500">
              Posted by: {forum?.badge || "Unknown"}
              <span>{forum.badge==="admin"?<AiFillAlert></AiFillAlert>:
              <AiFillAlipaySquare></AiFillAlipaySquare>}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-300">
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          disabled={forumData?.currentPage === 1}
          onClick={() => handlePageChange(forumData?.currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-lg text-gray-700 font-semibold">
          Page {forumData?.currentPage} of {forumData?.totalPages}
        </span>
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
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
