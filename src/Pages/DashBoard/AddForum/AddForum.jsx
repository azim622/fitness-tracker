import { useState } from 'react';
import { imageUpload } from '../../../api/utils'; // Assuming this is your image upload utility
import AxiosPublic from '../../../Hooks/AxiosPublic';
import Swal from 'sweetalert2';

const AddForum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = AxiosPublic();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const content = form.content.value;
    const image = form.image.files[0];

    if (!image) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please upload an image!',
      });
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Upload image and get the image URL
      const photoURL = await imageUpload(image); // Ensure imageUpload returns a valid URL

      // Creating the post object
      const newPost = { title, content, image, photoURL, upVote: 0, downVote: 0 };

      // Submit the new post
      const res = await axiosPublic.post('/forums', newPost);
      const data = res.data;

      if (data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your forum post was added successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset(); // Reset form after successful submission
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue adding the forum post.',
      });
    } finally {
      setIsLoading(false); // Stop loading
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
            placeholder="Enter forum title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Forum Image */}
        <div className="relative mb-4">
          <input
            type="file"
            id="image"
            name="image"
            placeholder="Forum Image"
            className="w-full h-10 px-4 text-sm border rounded"
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
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Forum Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForum;
