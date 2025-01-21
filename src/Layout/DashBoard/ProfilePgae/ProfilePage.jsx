import React, { useState } from 'react';
import useAuth from '../../../Hooks/UseAuth';

const ProfilePage = () => {
    const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updateUserProfile(name, photoURL);
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
              <label className="block font-medium mb-1" htmlFor="photoURL">
                Profile Picture URL
              </label>
              <input
                id="photoURL"
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
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
              >
                Update Profile
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