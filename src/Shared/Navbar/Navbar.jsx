import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import AxiosPublic from "../../Hooks/AxiosPublic";

const Navbar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut, role, setRole } = useContext(AuthContext);
  const axiosPublic = AxiosPublic();

  useEffect(() => {
    const fetchRole = async () => {
      if (user?.email) {
        try {
          const response = await axiosPublic.get(`/getRoles/${user.email}`);
          setRole(response.data?.role);
        } catch (error) {
          console.error("Failed to fetch role:", error);
          setRole(null);
        }
      }
    };
    fetchRole();
  }, [user?.email, axiosPublic, setRole]);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50  bg-[#0047AB] shadow-lg">
      <div className="mx-auto container  px-6">

        <nav className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <img
                src="https://i.ibb.co/7KnHbLm/DALL-E-2025-01-14-00-00-08-A-modern-and-minimalist-logo-design-for-a-brand-named-Fitness-Tracker-The.webp"
                alt="Fitness Tracker Logo"
                className="h-12 w-12 rounded-full"
              />
            </Link>
            <Link to="/">
              <h2 className="text-xl font-bold text-white">Fitness Tracker</h2>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative h-10 w-10 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setIsToggleOpen(!isToggleOpen)}
            aria-label="Toggle navigation"
          >
            <div className="absolute inset-0 flex flex-col justify-center space-y-1.5">
              <span
                className={`h-0.5 w-full bg-white transition-transform duration-300 ${
                  isToggleOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-white transition-opacity duration-300 ${
                  isToggleOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-white transition-transform duration-300 ${
                  isToggleOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              ></span>
            </div>
          </button>

          {/* Navigation Links */}
          <ul
            className={`absolute left-0 right-0 top-16 w-full bg-[#0047AB] p-6 text-center shadow-lg lg:relative lg:top-0 lg:flex lg:w-auto lg:items-center lg:space-x-8 lg:p-0 lg:shadow-none ${
              isToggleOpen ? "block" : "hidden"
            }`}
          >
            <li>
              <Link to="/" className="block py-2 text-white hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/allTrainer" className="block py-2 text-white hover:text-gray-200">
                All Trainer
              </Link>
            </li>
            <li>
              <Link to="/allClass" className="block py-2 text-white hover:text-gray-200">
                All Class
              </Link>
            </li>

            {/* Conditionally Rendered Routes */}
            {user && (
              <>
                <li>
                  <Link to="/community" className="block py-2 text-white hover:text-gray-200">
                    Community
                  </Link>
                </li>
               
              </>
            )}
          </ul>

          {/* User Avatar and Dropdown */}
          <div id="avatar-dropdown" className="relative">
            {user ? (
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-10 w-10 rounded-full border border-white focus:outline-none"
              >
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              </button>
            ) : (
              <Link to="/login" className="py-2 px-4 text-white hover:text-gray-200">
                Login
              </Link>
            )}

            {isDropdownOpen && user && (
              <ul className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg">
                <li className="border-b">
                  <Link
                    to={
                      role === "admin"
                        ? "/dashboard/admin/newsLatter"
                        : role === "trainer"
                        ? "/dashboard/trainer/addSlot"
                        : "/dashboard/member/activityLog"
                    }
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
