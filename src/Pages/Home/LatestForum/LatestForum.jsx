import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const LatestForum = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: forumData, isLoading, isError } = useQuery({
        queryKey: ["forums"],
        queryFn: async () => {
            const res = await axiosSecure.get("/forums"); // Fetch all forums
            return res.data; 
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching forums</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h3 className="text-center text-4xl font-bold mb-8 text-gray-800">Latest Forum</h3>

            {/* Display Posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {forumData?.forums?.map((forum) => (
                    <div
                        key={forum._id}
                        className="bg-white rounded-lg shadow-xl p-6 hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                        <img
                            src={forum.photoURL} // Ensure correct path to photoURL
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestForum;
