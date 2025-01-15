import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 w-1/3 left-0 z-50 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative w-48 md:w-64 shadow-xl`}
      >
        <div className="flex justify-between items-center px-4 py-3 bg-indigo-600 md:hidden">
          <h2 className="text-white text-lg font-bold">Dashboard</h2>
          <button
            className="text-white p-2 rounded-full bg-indigo-700 hover:bg-indigo-800"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <ul className="menu mt-8 px-4 text-white space-y-4">
          <li>
            <NavLink
              to="/dashboard/newsLatter"
              className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300"
            >
              NewsLatter Subscriber
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/showTrainer"
              className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300"
            >
              All Trainer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/addClass"
              className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300"
            >
              Add Class
            </NavLink>
          </li>
          <div className="divider border-t border-white mt-4"></div>
        </ul>

        <ul className="menu mt-4 px-4 text-white space-y-4">
          <li>
            <NavLink
              to="/"
              className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300"
            >
              Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 md:pl-10 transition-all duration-300">
        <div className="p-4">
          {/* Toggle Button */}
          <button
            className="md:hidden text-white bg-indigo-600 px-4 py-2 rounded-lg mb-4 shadow-md hover:bg-indigo-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰ Menu
          </button>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
