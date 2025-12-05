import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle login submit
  const onSubmit = (data) => {
    const { email, password } = data;

    signInUser(email, password)
      .then(() => {
        reset();
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back!",
          icon: "success",
          confirmButtonColor: "#6366f1",
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed!",
          text: "Invalid email or password. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
        console.log(error);
      });
  };

  // Google sign-in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back!",
          icon: "success",
          confirmButtonColor: "#6366f1",
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Google Sign-In Failed!",
          text: "Please try again later.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        {/* React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <label className="label">Password</label>
            <input
              type="password"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn text-white mt-4 rounded-full bg-gradient-to-r from-pink-500 to-red-600">
              Login
            </button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white rounded-full text-black border-[#e5e5e5]"
        >
          <FaGoogle />
          Login with Google
        </button>

        <p className="text-center">
          New to our website?{" "}
          <Link
            className="text-blue-500 hover:text-blue-800"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
