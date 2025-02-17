import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../../Shared/socialLogin/SocialLogin";
import Swal from "sweetalert2"; // Import SweetAlert

const Login = () => {
  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location?.state?.from?.pathname || "/";
  console.log("state in the location", location.state);

  const handleLogin = (e) => {
    e.preventDefault();
    signin(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError(""); // Clear error on successful login
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
      .catch((error) => {
        // Display error below password field
        setError("Invalid email or password. Please try again.");
        console.error("Login error:", error);
      });
  };

  const fillAdminCredentials = () => {
    setEmail("azim256@gmail.com");
    setPassword("123Aa@");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white rounded shadow-md p-6">
        <h3 className="text-xl font-medium text-center mb-4">Login</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mb-2">
          Log in
        </button>
        <button type="button" onClick={fillAdminCredentials} className="w-full bg-gray-500 text-white py-2 rounded mb-4">
          Use Admin Credentials
        </button>
        <SocialLogin />
        <p className="text-center mt-4">
          <small>
            New Here? <Link to="/signIn" className="text-red-500 font-semibold">SignUp</Link>
          </small>
        </p>
      </form>
    </div>
  );
};

export default Login;
