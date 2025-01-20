import React, { useState } from "react";
import Select from "react-select";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AddNewSlot = () => {
  const axiosSecure = UseAxiosSecure();

  // Fetch classes using react-query
  const { data: classes, isLoading, error } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/addClass");
      return res.data; // Assuming the response contains an array of classes
    },
  });

  


  const daysOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  // State hooks for form fields
  const [slotName, setSlotName] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the new slot object
    const newSlot = {
      slotName,
      slotTime,
      selectedDays,
      selectedClass,
      additionalInfo,
    };
    console.log("New Training Slot:", newSlot);
    // Add your submit logic here (e.g., sending data to API)
  };

  // Handle search functionality (you can use this to filter classes)
  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    // Filter the classes based on the search query (if needed)
    // You can filter based on class name or any other field
  };

  // Loading or error handling
  if (isLoading) return <p>Loading classes...</p>;
  if (error) return <p>Error loading classes: {error.message}</p>;

  // Ensure classes is an array before calling map
  const classesList = Array.isArray(classes) ? classes : [];

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200"
      >
        {/* Form Header */}
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="text-xl font-medium text-slate-700">
              Add New Training Slot
            </h3>
            <p>Create a new training slot for your classes</p>
          </header>

          {/* Slot Name */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Slot Name:
            </label>
            <input
              type="text"
              value={slotName}
              onChange={(e) => setSlotName(e.target.value)}
              placeholder="e.g., Morning Workout"
              className="w-full px-4 py-2 text-sm border rounded outline-none border-slate-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200"
              required
            />
          </div>

          {/* Slot Time */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Slot Time:
            </label>
            <input
              type="text"
              value={slotTime}
              onChange={(e) => setSlotTime(e.target.value)}
              placeholder="e.g., 1 hour"
              className="w-full px-4 py-2 text-sm border rounded outline-none border-slate-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200"
              required
            />
          </div>

          {/* Available Days */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Available Days:
            </label>
            <Select
              options={daysOptions}
              isMulti
              value={selectedDays}
              onChange={setSelectedDays}
              placeholder="Select days..."
            />
          </div>

          {/* Select Class */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Select Class:
            </label>
            <Select
              options={classesList?.map((classItem) => ({
                value: classItem._id,
                label: classItem.className,
              }))}
              value={selectedClass}
              onChange={setSelectedClass}
              placeholder="Select a class..."
            />
          </div>

          {/* Additional Info */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Additional Information:
            </label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows="4"
              placeholder="Any additional details"
              className="w-full px-4 py-2 text-sm border rounded outline-none border-slate-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end p-6">
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          >
            Add New Slot
          </button>
        </div>
      </form>

      {/* Search Bar */}
      <div className="mb-4 mx-auto">
        <input
          type="text"
          placeholder="Search for a class..."
          onChange={handleSearch}
          className="border rounded-lg px-4 py-2 w-1/2"
        />
      </div>

      {/* Display Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classesList?.map((classItem) => (
          <div
            key={classItem._id}
            className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={classItem.image}
              alt={classItem.className}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{classItem.className}</h2>
              <p className="text-gray-600 mb-4">{classItem.details}</p>
              {classItem.additionalInfo && (
                <p className="text-gray-500 text-sm">{classItem.additionalInfo}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddNewSlot;
