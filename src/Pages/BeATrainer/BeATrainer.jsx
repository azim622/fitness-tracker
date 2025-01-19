import React, { useState } from "react";
import Select from "react-select";
import useAuth from "../../Hooks/UseAuth";
import axios from "axios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ApplyForm = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
    experience: "",
    profileImage: null,
    skills: [],
    availableDays: [],
    availableTime: "",
  });

  const skillOptions = [
    { value: "Personal Training", label: "Personal Training" },
    { value: "Yoga Instruction", label: "Yoga Instruction" },
    { value: "Nutrition Coaching", label: "Nutrition Coaching" },
    { value: "Cardio Training", label: "Cardio Training" },
    { value: "Strength Training", label: "Strength Training" },
    { value: "Group Fitness", label: "Group Fitness" },
  ];

  const dayOptions = [
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" },
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profileImage) {
      alert("Please upload a profile image!");
      return;
    }

    const imageData = new FormData();
    imageData.append("image", formData.profileImage);

    try {
      // Upload the image to ImageBB
      const response = await axios.post(image_hosting_api, imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        const imageUrl = response.data.data.url; // Get the uploaded image URL

        // Prepare the final form data for submission
        const finalFormData = {
          ...formData,
          profileImage: imageUrl, // Replace the file object with the image URL
          status: "pending", // Ensure the status is set to 'pending'
        };

        console.log("Submitted Data:", finalFormData);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Trainer request added successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Submit the data to the backend
        await axiosSecure.post("/apply", finalFormData);
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200"
    >
      <div className="p-6">
        <header className="mb-4 text-center">
          <h3 className="text-xl font-medium text-slate-700">Apply Form</h3>
        </header>
        <div className="flex flex-col space-y-6">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full h-10 px-4 text-sm border rounded outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Email (Read-only) */}
          <div className="relative">
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full h-10 px-4 text-sm border rounded bg-gray-100 text-gray-600"
            />
          </div>

          {/* Age */}
          <div className="relative">
            <input
              type="number"
              placeholder="Age"
              value={formData.age || ""}
              onChange={(e) => handleChange("age", e.target.value)}
              className="w-full h-10 px-4 text-sm border rounded outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Profile Image */}
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full h-10 px-4 text-sm border rounded"
              required
            />
          </div>

          {/* Skills */}
          <div className="relative">
            <Select
              isMulti
              options={skillOptions}
              onChange={(selected) =>
                handleChange(
                  "skills",
                  selected.map((option) => option.value)
                )
              }
              placeholder="Select Skills"
            />
          </div>

          {/* Available Days */}
          <div className="relative">
            <Select
              isMulti
              options={dayOptions}
              onChange={(selected) =>
                handleChange(
                  "availableDays",
                  selected.map((option) => option.value)
                )
              }
              placeholder="Select Available Days"
            />
          </div>

          {/* Available Time */}
          <div className="relative">
            <input
              type="text"
              placeholder="Available Time"
              value={formData.availableTime}
              onChange={(e) => handleChange("availableTime", e.target.value)}
              className="w-full h-10 px-4 text-sm border rounded outline-none focus:border-emerald-500"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end p-6">
        <button
          type="submit"
          className="inline-flex items-center justify-center w-full h-10 px-5 text-sm font-medium text-white bg-emerald-500 rounded hover:bg-emerald-600 focus:outline-none"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default ApplyForm;
