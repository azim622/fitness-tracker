import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AxiosPublic from "../../Hooks/AxiosPublic";

const TrainerBookedPage = () => {
  const {id} = useParams()
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
      const response = await axiosPublic.get(`/slot/${id}`);
      console.log(response.data)
      return response.data;

    },
  });

  const handleJoinNow = (selectedPackage) => {
    navigate("/payment", { state: { trainer, selectedPackage } });
  };

  if (slotsLoading) return <div>Loading slots...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="trainer-details container mx-auto p-6"
    >
      <h2 className="text-4xl font-bold text-center my-4 text-blue-600 animate-pulse">
        Add Book List
      </h2>
      {/* Trainer Header */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="trainer-header flex flex-col md:flex-row items-center gap-4 mb-8 border rounded-lg shadow-md p-4 bg-gradient-to-r from-blue-50 to-indigo-50"
      >
        <img
          src={trainer.profileImage || "/default-profile.jpg"} // Use a default image if not provided
          alt={trainer.fullName || "Trainer"}
          className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow-lg"
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
            Available Days: {trainer.availableDays?.length > 0
              ? trainer.availableDays.join(", ")
              : "Not specified"}
          </p>
        </div>
      </motion.div>

      {/* Available Slots Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="slots-section mb-8"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Available Slots
        </h3>
        {slots.length > 0 ? (
          <motion.table
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full border-collapse border border-gray-300 rounded-lg shadow-md overflow-hidden"
          >
            <thead>
              <tr className="bg-gradient-to-r from-indigo-100 to-blue-100">
                <th className="border border-gray-300 px-4 py-2">Slot Name</th>
                <th className="border border-gray-300 px-4 py-2">Slot Time</th>
                <th className="border border-gray-300 px-4 py-2">Class</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot._id} className="hover:bg-blue-50 transition">
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
          </motion.table>
        ) : (
          <p>No available slots found.</p>
        )}
      </motion.div>

      {/* Membership Packages Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="membership-section mb-8"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
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
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="package-card border rounded-lg p-4 shadow-lg hover:shadow-xl transition-transform hover:scale-105 bg-gradient-to-r from-white to-blue-50"
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
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              >
                Join Now
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrainerBookedPage;