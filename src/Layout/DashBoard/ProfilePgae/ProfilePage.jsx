import React, { useState, useEffect } from "react";
import useAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "John Doe");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "/default-avatar.png");
  const [phone, setPhone] = useState("+1234567890");
  const [address, setAddress] = useState("123, Street Name, City");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    Swal.fire("Success", "Profile updated successfully!", "success");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-pink-200 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-96 text-center">
        <img src={photoURL} alt="Profile" className="w-24 h-24 rounded-full mx-auto border-4 border-pink-400" />
        <h2 className="text-xl font-bold text-pink-700 mt-3">{name}</h2>
        <p className="text-gray-600">Business Consultant</p>
        <p className="text-gray-500 mt-2">Phone: {phone}</p>
        <p className="text-gray-500">Address: {address}</p>
        <button onClick={() => setIsEditing(true)} className="mt-4 px-4 py-2 text-pink-700 border border-pink-700 rounded-lg hover:bg-pink-100">Update Profile</button>
        {isEditing && (
          <form onSubmit={handleUpdateProfile} className="mt-4 space-y-3 text-left">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" placeholder="Name" />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded" placeholder="Phone Number" />
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border rounded" placeholder="Address"></textarea>
            <button type="submit" className="w-full bg-pink-700 text-white py-2 rounded-lg hover:bg-pink-800">
              {isUploading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
