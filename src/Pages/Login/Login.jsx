import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../../Shared/socialLogin/SocialLogin";
import Swal from "sweetalert2";

const Login = () => {
  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location?.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    signin(email, password)
      .then((result) => {
        setError("");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate(from, { replace: true });
        });
      })
      .catch(() => {
        setError("Invalid email or password. Please try again.");
      });
  };

  const fillAdminCredentials = () => {
    setEmail("azim256@gmail.com");
    setPassword("123Aa@");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">Welcome Back</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-white font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={fillAdminCredentials}
            className="w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Use Admin Credentials
          </button>
        </form>
        <div className="my-6 text-center text-gray-600">OR</div>
        <SocialLogin />
        <p className="text-center text-gray-600 mt-4">
          New Here?{" "}
          <Link to="/signIn" className="text-yellow-300 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
