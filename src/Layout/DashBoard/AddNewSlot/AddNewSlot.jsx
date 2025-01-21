import React, { useState, useEffect } from "react";
import Select from "react-select";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/UseAuth";
import SelectClass from "./SelectClass";

const AddNewSlot = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const userEmail = user?.email;

  // Fetch classes dynamically using react-query
  const {
    data: classes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/addClass");
      return res.data;
    },
  });

  // Fetch trainer data dynamically
  const { data: trainers = {}, isLoading: isTrainerLoading } = useQuery({
    queryKey: ["trainer", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allTrainerData/${user?.email}`);
      return res.data;
    },
  });

  const [slotName, setSlotName] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState("");+
  console.log(selectedClass)

  // Update state with trainer data when it changes
  useEffect(() => {
    if (trainers && trainers.length > 0) {
      const trainerData = trainers[0]; // Or choose the relevant trainer
      setSlotName(trainerData.slotName || "");
      setSlotTime(trainerData.availableTime || "");
      setSelectedDays(
        trainerData.availableDays?.map((day) => ({ value: day, label: day })) || []
      );
    }
  }, [trainers]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const newSlot = {
    //   slotName,
    //   slotTime,
    //   selectedDays: selectedDays.map((day) => day.value), // Extract values from selectedDays
    //   selectedClass:selectedClass.label,
    //   additionalInfo,
    //   trainerEmail: userEmail,
    // };
    const newSlot = {
      slotName,
      slotTime,
      selectedDays: selectedDays.map((day) => day.value), // Extract values from selectedDays
      selectedClass: selectedClass?.label || "No Class Selected", // Extract the label from selectedClass
      additionalInfo,
      trainerEmail: userEmail,
    };

    console.log(newSlot)
    // try {
    //   const response = await axiosSecure.post("/addNewSlot", newSlot);
    //   if (response.status === 200) {
    //     alert("New slot added successfully!"); // Replace with toast or sweet alert if preferred
    //   } else {
    //     alert("Failed to add new slot.");
    //   }
    // } catch (error) {
    //   console.error("Error adding new slot:", error);
    //   alert("An error occurred. Please try again.");
    // }
  };

  if (isLoading || isTrainerLoading) return <p>Loading data...</p>;
  if (error) return <p>Error loading classes: {error.message}</p>;

  const daysOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200"
      >
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="text-xl font-medium text-slate-700">
              Add New Training Slot
            </h3>
            <p>Create a new training slot for your classes</p>
          </header>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Trainer Details:
            </label>
            {trainers.map((trainerData, index) => (
              <div key={index} className="mt-4 text-sm text-slate-600">
                {trainerData.profileImage && (
                  <div className="mb-4">
                    <img
                      src={trainerData.profileImage}
                      alt="Trainer Profile"
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    value={trainerData.fullName || "N/A"}
                    className="w-full px-4 py-2 text-sm border rounded outline-none border-slate-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200"
                    readOnly
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Email:
                  </label>
                  <input
                    type="text"
                    value={trainerData.email || "N/A"}
                    className="w-full px-4 py-2 text-sm border rounded outline-none border-slate-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200"
                    readOnly
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Available Time:
                  </label>
                  <input
                    type="text"
                    value={trainerData.availableTime || "N/A"}
                    className="w-full px-4 py-2 text-sm border rounded outline-none border-slate-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200"
                    readOnly
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Available Days:
                  </label>
                  <input
                    type="text"
                    value={trainerData.availableDays?.join(", ") || "N/A"}
                    className="w-full px-4 py-2 text-sm border rounded outline-none border-slate-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200"
                    readOnly
                  />
                </div>
              </div>
            ))}
          </div>

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

          <SelectClass setSelectedClass={setSelectedClass} />

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

        <div className="flex justify-end p-6">
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          >
            Add New Slot
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewSlot;
