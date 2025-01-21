import React, { useState } from "react";
import Select from "react-select";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SelectClass = ({ setSelectedClass }) => {
  const axiosSecure = UseAxiosSecure();

  // Fetch classes data
  const { data = {}, isLoading, error } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/addClass");
      return res.data; // Ensure your API response structure matches
    },
  });

  // Extract the classes array
  const classes = data.classes || [];

  // Map classes to React Select options
  const options = classes.map((item) => ({
    value: item._id,
    label: item.className || "Unnamed Class", // Fallback for null className
  }));

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSelectedClass(selectedOption); // Pass to parent component
    console.log("Selected Option:", selectedOption);
  };

  if (isLoading) return <p>Loading classes...</p>;
  if (error) return <p>Error loading classes: {error.message}</p>;

  return (
    <div>
      <h2>Select a Class</h2>
      <Select
        options={options} // Provide the options dynamically
        value={selectedOption} // Show selected option
        onChange={handleChange} // Handle selection change
        placeholder="Choose a class" // Placeholder text
      />
    </div>
  );
};

export default SelectClass;
