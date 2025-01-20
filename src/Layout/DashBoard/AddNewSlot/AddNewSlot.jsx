import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AddNewSlot = () => {
  const axiosSecure= UseAxiosSecure()

  const { data: trainer, isLoading, error } = useQuery({
    queryKey: ['trainer'], // Ensure the key is unique for this query
    queryFn: async () => {
      const res = await axiosSecure.get(`/apply/${id}`);
      return res.data;
    },
    enabled: !!id, // Only run the query if trainerId is defined
  });



  return (
    <form class="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
  {/* <!-- Form Header --> */}
  <div class="p-6">
    <header class="mb-4 text-center">
      <h3 class="text-xl font-medium text-slate-700">Add New Slot</h3>
    </header>

    {/* <!-- Previous Trainer Data (Read-only) --> */}
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-slate-700">Name:</label>
      <input
        type="text"
        value="Trainer's Name" 
        readonly
        class="w-full px-4 py-2 text-sm border rounded text-slate-500 bg-slate-100 border-slate-300"
      />
    </div>

    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-slate-700">Email:</label>
      <input
        type="email"
        value="trainer@example.com"
        readonly
        class="w-full px-4 py-2 text-sm border rounded text-slate-500 bg-slate-100 border-slate-300"
      />
    </div>

    {/* <!-- Select Days --> */}
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-slate-700">Select Days:</label>
      <div id="days-select" class="relative"></div>
    </div>

    {/* <!-- Slot Name --> */}
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-slate-700">Slot Name:</label>
      <input
        type="text"
        placeholder="e.g., Morning Slot"
        class="w-full px-4 py-2 text-sm border rounded outline-none border-slate-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200"
      />
    </div>

    {/* <!-- Slot Time --> */}
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-slate-700">Slot Time:</label>
      <input
        type="text"
        placeholder="e.g., 1 Hour"
        class="w-full px-4 py-2 text-sm border rounded outline-none border-slate-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200"
      />
    </div>

    {/* <!-- Classes Selection --> */}
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-slate-700">Select Classes:</label>
      <div id="classes-select" class="relative"></div>
    </div>

    {/* <!-- Additional Info --> */}
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-slate-700">Additional Info:</label>
      <textarea
        rows="4"
        placeholder="Any additional details"
        class="w-full px-4 py-2 text-sm border rounded outline-none border-slate-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200"
      ></textarea>
    </div>
  </div>

  {/* <!-- Submit Button --> */}
  <div class="flex justify-end p-6">
    <button
      type="submit"
      class="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
    >
      <span>Submit</span>
    </button>
  </div>
</form>



  );
};

export default AddNewSlot;