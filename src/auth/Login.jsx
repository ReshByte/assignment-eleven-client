import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Redirect path after login
  const from = location.state?.from || "/";

  // Handle login submit
  const onSubmit = ({ email, password }) => {
    signInUser(email, password)
      .then(() => {
        reset();
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          title: "Login Failed!",
          text: "Invalid email or password. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      });
  };

  // Google Sign-in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          title: "Google Sign-In Failed!",
          text: "Please try again later.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl border border-gray-200">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center mb-2">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset space-y-2">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input rounded-full focus:outline-gray-200"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input rounded-full w-full pr-10 focus:outline-gray-200"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Forgot Password */}
            <div className="text-right">
              <a className="link link-hover text-sm">Forgot password?</a>
            </div>

            {/* Login Button */}
            <button className="btn text-white mt-4 rounded-full bg-gradient-to-r from-pink-500 to-red-600 hover:scale-[1.02] transition-transform">
              Login
            </button>
          </fieldset>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white rounded-full text-black border border-gray-200 mt-3 flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <FaGoogle />
          Login with Google
        </button>

        {/* Register */}
        <p className="text-center mt-4 text-sm">
          New to our website?{" "}
          <Link
            to="/auth/register"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
