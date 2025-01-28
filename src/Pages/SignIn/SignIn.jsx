import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthPRovider";
import Swal from "sweetalert2";
import SocialLogin from "../../Shared/socialLogin/SocialLogin";
import AxiosPublic from "../../Hooks/AxiosPublic";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = AxiosPublic();

  const onSubmit = async (data) => {
    try {
      // Handle image upload to imgbb
      const imageData = new FormData();
      imageData.append("image", data.photo[0]); // Expecting the photo as a file input

      const imageResponse = await axios.post(image_hosting_api, imageData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = imageResponse?.data?.data?.display_url;

      if (!imageUrl) {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Failed to upload profile picture. Please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      // Proceed with user creation
      createUser(data.email, data.password)
        .then((result) => {
          const loggedUser = result.user;
          updateUserProfile(data.name, imageUrl)
            .then(() => {
              const userInfo = {
                name: data.name,
                email: data.email,
                photo: imageUrl,
              };
              axiosPublic.post("/users", userInfo).then((res) => {
                if (res.data.insertedId) {
                  reset();
                  Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Profile Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/");
                }
              });
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Registration failed. Please try again.",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "An error occurred. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-hidden w-full max-w-md bg-white rounded shadow-md text-slate-500 shadow-slate-200"
      >
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="text-xl font-medium text-slate-700">Register</h3>
          </header>
          <div className="flex flex-col space-y-8">
            {/* Name Input */}
            <div className="relative my-6">
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Your name"
                className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500"
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
              <label className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400">
                Your Name
              </label>
            </div>

            {/* Photo Upload */}
            <div className="relative my-6">
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: "Photo is required" })}
                className="relative w-full h-10 px-4 text-sm transition-all border rounded outline-none border-slate-200 text-slate-500"
              />
              {errors.photo && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.photo.message}
                </span>
              )}
              <label className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400">
                Upload Profile Picture
              </label>
            </div>

            {/* Email Input */}
            <div className="relative my-6">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Your email"
                className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
              <label className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400">
                Your Email
              </label>
            </div>

            {/* Password Input */}
            <div className="relative my-6">
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum length is 6" },
                  maxLength: { value: 20, message: "Maximum length is 20" },
                  pattern: {
                    value:
                      /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
                placeholder="Your password"
                className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
              <label className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400">
                Your Password
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end p-6">
          <button className="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white rounded bg-emerald-500 hover:bg-emerald-600">
            Sign Up
          </button>
        </div>

        {/* Social Login */}
        <SocialLogin />

        <p className="text-center mt-4">
          <small>
            Already Have an Account?{" "}
            <Link to="/login">
              <span className="text-red-500 font-semibold">Login</span>
            </Link>
          </small>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
