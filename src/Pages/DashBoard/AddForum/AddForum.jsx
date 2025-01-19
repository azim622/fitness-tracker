import React, { useState } from 'react';
import AxiosPublic from '../../../Hooks/AxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AddForum = () => {
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const axiosPublic = AxiosPublic();
  

//   const {data: trainers=[]}=useQuery({
//     queryKey:['trainers'],
//     queryFn:async()=>{
//         const res = await axiosPublic.post('/forums')
//         return res.data 
//     }
// })



  const handlePostSubmit = async (e) => {
    e.preventDefault()
    const form =e.target 
    const title=form.title.value
    const content=form.content.value
    const newPost = {title , content, upVote:0 , downVote:0}
    console.log(newPost)

    try{
      const res = await axiosPublic.post('/forums', newPost)
      const data = await res.data
      console.log(data)
      if(data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your added successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }

    }
   catch(error){
    console.log(error)
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
            // value={newPost.title}
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
            // value={newPost.content}
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
