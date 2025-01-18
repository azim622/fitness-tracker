import React, { useState } from 'react';
import AxiosPublic from '../../../Hooks/AxiosPublic';

const AddForum = () => {
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const axiosInstance = AxiosPublic();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/forums', newPost);
      if (response.data.insertedId) {
        alert('Forum post added successfully!');
        setNewPost({ title: '', content: '' }); // Clear the form
      } else {
        alert('Failed to add forum post.');
      }
    } catch (error) {
      console.error('Error adding forum post:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Forum Post</h2>
      <form onSubmit={handlePostSubmit}>
        {/* Forum Title */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="title">
            Forum Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            placeholder="Enter forum title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Forum Content */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="content">
            Forum Content
          </label>
          <textarea
            id="content"
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
            placeholder="Write your forum content..."
            rows="6"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Forum Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForum;
