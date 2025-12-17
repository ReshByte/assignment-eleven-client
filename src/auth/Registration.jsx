import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";

const Registration = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const { displayName, email, password, photoURL, address } = data;
    const toastId = toast.loading("Creating user...");

    try {
      await createUser(email, password);
      await updateUserProfile(displayName, photoURL);

      const userInfo = {
        name: displayName,
        email: email,
        image: photoURL,
        address: address,
        role: "user",
        status: "active"
      };

      await axios.post("https://assignment-eleven-server-lemon.vercel.app/users", userInfo);

      toast.success("User created successfully!", { id: toastId });
      reset();
      navigate("/");
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <div className="card bg-base-100 border border-gray-200 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered rounded-full"
              {...register("displayName", { required: "Name is required" })}
            />
            {errors.displayName && (
              <p className="text-red-500 text-xs mt-1">{errors.displayName.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Profile Image URL"
              className="input input-bordered rounded-full"
              {...register("photoURL", { required: "Photo URL is required" })}
            />
            {errors.photoURL && (
              <p className="text-red-500 text-xs mt-1">{errors.photoURL.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="Your Address"
              className="input input-bordered rounded-full"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered rounded-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered rounded-full"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message:
                    "Must contain uppercase, lowercase and min 6 chars",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered rounded-full"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="form-control mt-6">
            <button className="btn text-white rounded-full bg-gradient-to-r from-pink-500 to-red-600 border-none">
              Register
            </button>
          </div>
        </form>

        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <Link className="text-blue-600 font-bold hover:underline" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;