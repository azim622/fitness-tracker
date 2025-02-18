import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, role, logout } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <div className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>{user?.displayName}</span>
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full border"
          />
         
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 z-50 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative w-48 md:w-64 shadow-xl`}
        >
          <div className="p-4">
            <h2 className="text-white text-xl font-bold">Fitness Tracker</h2>
          </div>
          <div className="flex justify-between items-center px-4 py-3 bg-indigo-600 md:hidden">
            <h2 className="text-white text-lg font-bold">Dashboard</h2>
            <button
              className="text-white p-2 rounded-full bg-indigo-700 hover:bg-indigo-800"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Sidebar Menu */}
          <ul className="menu mt-8 px-4 text-white space-y-4">
            {role === "admin" && (
              <>
                <li>
                  <NavLink to="/dashboard/admin/newsLatter" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    Newsletter Subscriber
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/showTrainer" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    All Trainers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/addClass" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    Add Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/applyTrainer" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    Applied Trainers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/payment-balance" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    Over View
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/users" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/addForum" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    Add Forum
                  </NavLink>
                </li>
              </>
            )}
            {role === "trainer" && (
              <>
                <li>
                  <NavLink to="/dashboard/trainer/addSlot" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    Add New Slot
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/trainer/manageSlot" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    Manage Slot
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/addForum" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    Add Forum
                  </NavLink>
                </li>
              </>
            )}
            {role === "member" && (
              <>
                <li>
                  <NavLink to="/dashboard/member/activityLog" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    Activity Log
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/member/book-trainer" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    Book Trainer
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/member/profilePage" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
                    My Profile
                  </NavLink>
                </li>
              </>
            )}
            <hr className="border-t-2 border-gray-300 my-4" />
            <li>
              <NavLink to="/" className="hover:bg-indigo-700 p-2 rounded-lg transition duration-300">
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
    </div>
  );
};

export default DashBoard;
