import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthPRovider";
import SocialLogin from "../../Shared/socialLogin/SocialLogin";
import Swal from "sweetalert2"; // Import SweetAlert

const Login = () => {
  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const from = location?.state?.from?.pathname || "/";
  console.log("state in the location", location.state);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signin(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError(""); // Clear error on successful login
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "'You have logged in successfully",
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Card with form */}
      <form
        onSubmit={handleLogin}
        className="overflow-hidden w-full max-w-md bg-white rounded shadow-md text-slate-500 shadow-slate-200"
      >
        {/* Body */}
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="text-xl font-medium text-slate-700">Login</h3>
          </header>
          <div className="flex flex-col space-y-8">
            {/* Email Input */}
            <div className="relative my-6">
              <input
                id="id-b03"
                type="email"
                name="email"
                placeholder="your email"
                className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="id-b03"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500"
              >
                Your email
              </label>
              <small className="absolute flex justify-between w-full px-4 py-1 text-xs text-slate-400 peer-invalid:text-pink-500">
                <span>Type your email address</span>
              </small>
            </div>
            {/* Password Input */}
            <div className="relative my-6">
              <input
                id="id-b13"
                type="password"
                name="password"
                placeholder="your password"
                className="relative w-full h-10 px-4 pr-12 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="id-b13"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500"
              >
                Your password
              </label>
              {/* Error Message */}
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
          </div>
        </div>
        {/* Action button */}
        <div className="flex justify-end p-6">
          <button className="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus:outline-none bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700">
            <span>Log in</span>
          </button>
        </div>
        {/* social login */}
        <SocialLogin></SocialLogin>

        <p className="text-center mt-4">
          <small>
            New Here?{" "}
            <Link to="/signIn">
              <span className="text-red-500 font-semibold">SignUp</span>
            </Link>
          </small>
        </p>
      </form>
    </div>
  );
};

export default Login;
