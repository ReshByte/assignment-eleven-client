import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";

const Registration = () => {
  const { createUser, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password");

  // Add user to database
  const addUserTodb = async (user, extra) => {
    const userData = {
      uid: user.uid,
      displayName: extra.displayName,
      photoURL: extra.photoURL,
      email: user.email,
      address: extra.address,
      role: "user",       // default role
      status: "active",   // default status
    };

    try {
      const res = await fetch("https://m10-cs.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle registration
  const onSubmit = (data) => {
    const { displayName, email, password, photoURL, address } = data;

    toast.loading("Creating user...", { id: "create-user" });

    createUser(email, password)
      .then((result) => {
        updateUserProfile(displayName, photoURL);
        addUserTodb(result.user, { displayName, photoURL, address });

        toast.success("User created successfully!", { id: "create-user" });
        reset();
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message, { id: "create-user" });
      });
  };

  return (
    <div className="card bg-base-100 border border-gray-200 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Register</h1>

        {/* React Hook Form Submit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="input rounded-full"
            {...register("displayName", {
              required: "Name is required",
            })}
          />
          {errors.displayName && (
            <p className="text-red-500">{errors.displayName.message}</p>
          )}

          {/* Photo URL */}
          <label className="label">Photo URL</label>
          <input
            type="text"
            placeholder="Profile Image URL"
            className="input rounded-full"
            {...register("photoURL", { required: "Photo URL is required" })}
          />
          {errors.photoURL && (
            <p className="text-red-500">{errors.photoURL.message}</p>
          )}

          {/* Address */}
          <label className="label">Address</label>
          <input
            type="text"
            placeholder="Your Address"
            className="input rounded-full"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Email Address"
            className="input rounded-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="input rounded-full"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                message:
                  "Password must contain uppercase, lowercase and be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {/* Confirm Password */}
          <label className="label">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="input rounded-full"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          {/* Submit Button */}
          <button className="btn text-white mt-4 rounded-full bg-gradient-to-r from-pink-500 to-red-600">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:text-blue-800" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
