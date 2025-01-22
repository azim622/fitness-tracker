import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import AxiosPublic from "../../Hooks/AxiosPublic";

const TrainerBookedPage = () => {
  const axiosPublic = AxiosPublic();
  const navigate = useNavigate();

  // Fetch trainer data from loader
  const trainer = useLoaderData();

  // Check if trainer data is available
  if (!trainer) {
    return <div>Error: Trainer data not found.</div>;
  }

  // Fetch slot data dynamically
  const { data: slots = [], isLoading: slotsLoading } = useQuery({
    queryKey: ["slots"],
    queryFn: async () => {
      const response = await axiosPublic.get("/slots");
      return response.data;
    },
  });

  const handleJoinNow = (selectedPackage) => {
    navigate("/payment", { state: { trainer, selectedPackage } });
  };

  if (slotsLoading) return <div>Loading slots...</div>;

  return (
    <div className="trainer-details container mx-auto p-6">
      {/* Trainer Header */}
      <div className="trainer-header flex flex-col md:flex-row items-center gap-4 mb-8">
        <img
          src={trainer.profileImage || "/default-profile.jpg"} // Use a default image if not provided
          alt={trainer.fullName || "Trainer"}
          className="w-32 h-32 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {trainer.fullName || "Trainer Name"}
          </h2>
          <p className="text-gray-600">Email: {trainer.email || "N/A"}</p>
          <p className="text-gray-600">
            Available Time: {trainer.availableTime || "Not specified"}
          </p>
          <p className="text-gray-600">
            Available Days:{" "}
            {trainer.availableDays?.length > 0
              ? trainer.availableDays.join(", ")
              : "Not specified"}
          </p>
        </div>
      </div>

      {/* Available Slots Section */}
      <div className="slots-section mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Available Slots
        </h3>
        {slots.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Slot Name</th>
                <th className="border border-gray-300 px-4 py-2">Slot Time</th>
                <th className="border border-gray-300 px-4 py-2">Class</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {slot.slotName || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {slot.slotTime || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {slot.selectedClass || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No available slots found.</p>
        )}
      </div>

      {/* Membership Packages Section */}
      <div className="membership-section mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Membership Packages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Basic Membership",
              benefits: [
                "Access to gym facilities during regular operating hours",
                "Use of cardio and strength training equipment",
              ],
              price: 10,
            },
            {
              name: "Standard Membership",
              benefits: [
                "All benefits of the basic membership",
                "Access to group fitness classes such as yoga, spinning, and Zumba",
              ],
              price: 50,
            },
            {
              name: "Premium Membership",
              benefits: [
                "All benefits of the standard membership",
                "Access to personal training sessions with certified trainers",
                "Use of additional amenities like a sauna or steam room",
                "Discounts on additional services such as massage therapy or nutrition counseling",
              ],
              price: 100,
            },
          ].map((packageItem, index) => (
            <div
              key={index}
              className="package-card border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                {packageItem.name}
              </h4>
              <ul className="text-gray-600 text-sm mb-4 list-disc pl-4">
                {packageItem.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
              <p className="text-gray-800 font-bold text-lg">
                ${packageItem.price}
              </p>
              <button
                onClick={() => handleJoinNow(packageItem)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Join Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerBookedPage;
