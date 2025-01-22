import React from "react";
import { useLocation } from "react-router-dom";
import AxiosPublic from "../../Hooks/AxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const location = useLocation();
  const axiosPublic= AxiosPublic()
  const { trainer, selectedPackage } = location.state || {};
  const { data: slots = [], isLoading: slotsLoading } = useQuery({
    queryKey: ["slots"],
    queryFn: async () => {
      const response = await axiosPublic.get("/slots");
      return response.data;
    },
  });

  // Check if required data is available
  if (!trainer || !selectedPackage) {
    return (

      <div className="error-page flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Error: Missing Payment Details
          </h1>
          <p className="text-gray-600 mb-6">
            We could not find the necessary information. Please go back and try
            again.
          </p>
          <a
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page container mx-auto px-6 py-10 bg-gray-50 rounded shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Complete Your Booking
      </h1>

      {/* Trainer and Package Details */}
      <div className="details-section border border-gray-300 rounded-lg p-6 mb-8 bg-white">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Trainer Name:</span>{" "}
              {trainer.fullName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {trainer.email}
            </p>
          </div>
          <div>
          {
            slots.map(slot=><p className="text-gray-600">
                <span className="font-semibold">Slot Name:</span>{" "}
                {slot.slotName || "Not Available"}
              </p>)
          }
            <p className="text-gray-600">
              <span className="font-semibold">Package Name:</span>{" "}
              {selectedPackage.name}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Price:</span> $
              {selectedPackage.price}
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Section */}
      <div className="confirmation-section text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Please confirm your booking details before proceeding.
        </h2>
        <button
          onClick={() => alert("Proceeding to payment...")} // Placeholder action
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Confirm and Proceed
        </button>
      </div>
    </div>
  );
};

export default Payment;
