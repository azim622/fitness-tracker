import React, { useState } from "react";
import useAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
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
      const data = await response.json();
      return data.success ? data.data.url : null;
    } catch (error) {
      setErrorMessage("Image upload failed. Try again.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    let uploadedPhotoURL = photoURL;

    if (selectedFile) {
      const uploadedURL = await handleImageUpload(selectedFile);
      if (!uploadedURL) return;
      uploadedPhotoURL = uploadedURL;
    }

    try {
      await updateUserProfile(name, uploadedPhotoURL);
      setPhotoURL(uploadedPhotoURL);
      Swal.fire("Success", "Profile updated successfully!", "success");
    } catch (error) {
      setErrorMessage("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Profile</h2>
      <div className="flex flex-col items-center">
        <img src={photoURL || "/default-avatar.png"} className="w-24 h-24 rounded-full mb-4" alt="Profile" />
        <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} className="mb-4" />
      </div>
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded" />
        <input type="email" value={user?.email || ""} readOnly className="w-full px-3 py-2 border bg-gray-100 cursor-not-allowed" />
        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border rounded" />
        <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 border rounded"></textarea>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {isUploading ? "Uploading..." : "Update Profile"}
        </button>
      </form>
      {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
    </div>
  );
};

export default ProfilePage;
