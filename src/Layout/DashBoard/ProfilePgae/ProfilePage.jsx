import React, { useState } from "react";
import useAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [selectedFile, setSelectedFile] = useState(null); // For file upload
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY; // Use your ImgBB API key from env variables
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        return data.data.url; // Return the uploaded image URL
      } else {
        throw new Error(data.error?.message || "Image upload failed.");
      }
    } catch (error) {
      console.error("Image upload failed:", error.message);
      setErrorMessage(`Image upload failed: ${error.message}`);
      setIsUploading(false);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    let uploadedPhotoURL = photoURL; // Default to existing photoURL if no new file is selected.

    if (selectedFile) {
      const uploadedURL = await handleImageUpload(selectedFile); // Upload the new image
      if (!uploadedURL) {
        return; // Stop if the upload fails
      }
      uploadedPhotoURL = uploadedURL; // Use the uploaded image URL
    }

    try {
      await updateUserProfile(name, uploadedPhotoURL);
      setPhotoURL(uploadedPhotoURL); // Update state with new photo URL
      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block font-medium mb-1">Profile Picture</label>
            <div className="flex items-center gap-4">
              <img
                src={photoURL || "/default-avatar.png"}
                alt="Profile"
                className="w-16 h-16 rounded-full border"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email (Read-Only)</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Last Login */}
          <div>
            <label className="block font-medium mb-1">Last Login</label>
            <input
              type="text"
              value={user?.metadata?.lastSignInTime || "Not Available"}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Update Profile"}
            </button>
          </div>

          {/* Success or Error Message */}
          {successMessage && (
            <p className="text-green-600 font-medium mt-2">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-600 font-medium mt-2">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
