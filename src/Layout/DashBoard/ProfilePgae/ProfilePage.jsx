import React, { useState, useEffect } from "react";
import useAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      fetch(`/api/user/${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          setPhone(data.phone || "");
          setAddress(data.address || "");
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await updateUserProfile(name, photoURL);
      Swal.fire("Success", "Profile updated successfully!", "success");
    } catch (error) {
      setErrorMessage("Failed to update profile.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[450px] text-center">
        <img src={photoURL || "/default-avatar.png"} className="w-36 h-36 rounded-full mx-auto border-4 border-blue-500 mb-4" alt="Profile" />
        <h2 className="text-3xl font-bold text-blue-700">{name || "User Name"}</h2>
        <p className="text-gray-600">{user?.email}</p>
        <p className="text-gray-500 mt-2">Phone: {phone || "Not provided"}</p>
        <p className="text-gray-500">Address: {address || "Not provided"}</p>
        <button onClick={() => document.getElementById('update-form').classList.toggle('hidden')} className="mt-4 px-4 py-2 text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-100">Update Profile</button>
        <form id="update-form" onSubmit={handleUpdateProfile} className="space-y-4 hidden mt-6">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
          <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
          <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 border rounded text-black"></textarea>
          <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
            {isUploading ? "Uploading..." : "Save Changes"}
          </button>
        </form>
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
