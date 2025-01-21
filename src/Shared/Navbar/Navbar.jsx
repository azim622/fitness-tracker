import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthPRovider";
import AxiosPublic from "../../Hooks/AxiosPublic";

const Navbar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut, role, setRole } = useContext(AuthContext);

  const axiosPublic = AxiosPublic();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        if (user?.email) {
          const response = await axiosPublic.get(`/getRole/${user.email}`);
          if (response.data?.length > 0) {
            setRole(response.data[0]?.role);
          }
        }
      } catch (error) {
        console.error("Failed to fetch role:", error);
        setRole(null);
      }
    };

    if (user) fetchRole();
  }, [user, axiosPublic]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest("#avatar-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-lg">
      <div className="relative mx-auto max-w-7xl px-6">
        <nav
          aria-label="main navigation"
          className="flex h-16 items-center justify-between"
        >
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.ibb.co/7KnHbLm/DALL-E-2025-01-14-00-00-08-A-modern-and-minimalist-logo-design-for-a-brand-named-Fitness-Tracker-The.webp"
              alt="Fitness Tracker Logo"
              className="h-12 w-12 rounded-full"
            />
            <h2 className="text-xl font-bold text-gray-700">Fitness Tracker</h2>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden relative h-10 w-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              isToggleOpen ? "open" : ""
            }`}
            onClick={() => setIsToggleOpen(!isToggleOpen)}
            aria-label="Toggle navigation"
          >
            <div className="absolute inset-0 flex flex-col justify-center space-y-1.5">
              <span
                className={`h-0.5 w-full bg-gray-900 transition-transform duration-300 ${
                  isToggleOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-gray-900 transition-opacity duration-300 ${
                  isToggleOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-gray-900 transition-transform duration-300 ${
                  isToggleOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              ></span>
            </div>
          </button>

          {/* Navigation Links */}
          <ul
            className={`absolute left-0 top-16 w-full bg-white p-6 text-center shadow-lg lg:relative lg:top-0 lg:flex lg:w-auto lg:items-center lg:space-x-8 lg:p-0 lg:shadow-none ${
              isToggleOpen ? "block" : "hidden"
            }`}
          >
            <li>
              <Link
                to="/"
                className="block py-2 text-gray-700 hover:text-emerald-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/allTrainer"
                className="block py-2 text-gray-700 hover:text-emerald-500"
              >
                All Trainer
              </Link>
            </li>
            <li>
              <Link
                to="/allClass"
                className="block py-2 text-gray-700 hover:text-emerald-500"
              >
                All Class
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                className="block py-2 text-gray-700 hover:text-emerald-500"
              >
                Community
              </Link>
            </li>
          </ul>

          {/* User Avatar and Dropdown */}
          <div id="avatar-dropdown" className="relative">
            {user ? (
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-10 w-10 rounded-full border border-gray-300"
              >
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              </button>
            ) : (
              <Link
                to="/login"
                className="py-2 px-4 text-gray-700 hover:text-emerald-500"
              >
                Login
              </Link>
            )}

            {isDropdownOpen && (
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
