import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthPRovider';
import Swal from 'sweetalert2';
import SocialLogin from '../../Shared/socialLogin/SocialLogin';
import AxiosPublic from '../../Hooks/AxiosPublic';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {createUser , updateUserProfile } = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosPublic= AxiosPublic()

  const onSubmit=data =>{
    console.log(data)
    createUser(data.email, data.password)
  .then((result) => {
    const loggedUser = result.user;
    console.log(loggedUser);
    updateUserProfile(data.name, data.photo)
      .then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log('user login in the database')
            reset();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Profile Update Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
      })
      .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));

  }
  
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Card with form */}
      <form onSubmit={handleSubmit(onSubmit)} className="overflow-hidden w-full max-w-md bg-white rounded shadow-md text-slate-500 shadow-slate-200">
        {/* Body */}
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="text-xl font-medium text-slate-700">Register</h3>
          </header>
          <div className="flex flex-col space-y-8">
            {/* Input Name */}
            <div className="relative my-6">
              <input
                id="id-b03"
                type="name"
                {...register("name", { required: "Name is required" })}
                placeholder="your name"
                className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              {errors.name && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </span>
                )}
            
              <label
                htmlFor="id-b03"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500"
              >
                
                Your Name
              </label>
              
            </div>
            {/* Input field */}
            <div className="relative my-6">
              <input
                id="id-b03"
                type="photo"
                {...register("photo", { required: "photo is required" })}
                placeholder="your photo"
                className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
                {errors.photo && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.photo.message}
                  </span>
                )}
              <label
                htmlFor="id-b03"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500"
              >
                Your photo
              </label>
              
            </div>
            {/* Input field */}
            <div className="relative my-6">
              <input
                id="id-b03"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="your email"
                className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
                 {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              <label
                htmlFor="id-b03"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500"
              >
                Your email
              </label>
              
            </div>
            {/* Input field */}
            <div className="relative my-6">
              <input
                id="id-b13"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="your password"
                className="relative w-full h-10 px-4 pr-12 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
              <label
                htmlFor="id-b13"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500"
              >
                Your password
              </label>
              
             
            </div>
          </div>
        </div>
        {/* Action button */}
        <div className="flex justify-end p-6">
          <button className="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus:outline-none bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700">
            <span>Sign Up</span>
          </button>
        </div>
        {/* social login */}
        <SocialLogin></SocialLogin>

        <p className="text-center mt-4">
        <small>
                Already Have an Account ? <Link to="/login"><span className="text-red-500 font-semibold">Login</span></Link>
              </small>
        </p>
      </form>
    </div>
    );
};

export default SignIn;