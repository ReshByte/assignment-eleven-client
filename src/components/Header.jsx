import React, { use } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => navigate("/"));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-pink-600 font-semibold" : "hover:text-pink-500"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/meals"
          className={({ isActive }) =>
            isActive ? "text-pink-600 font-semibold" : "hover:text-pink-500"
          }
        >
          Meals
        </NavLink>
      </li>

      {/* Dashboard visible after login */}
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-pink-600 font-semibold" : "hover:text-pink-500"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50 px-4">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box shadow-lg mt-3 w-52 p-2"
          >
            {navLinks}
          </ul>
        </div>

        {/* LOGO */}
        <NavLink
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent"
        >
          LocalChefBazaar
        </NavLink>
      </div>

      {/* CENTER (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-3 text-[16px]">{navLinks}</ul>
      </div>

      {/* RIGHT - Auth Buttons */}
      <div className="navbar-end flex items-center gap-3">

        {/* If NOT logged in */}
        {!user && (
          <>
            <NavLink
              to="/auth/login"
              className="btn btn-outline rounded-full border-pink-500 text-pink-600 hover:bg-pink-600 hover:text-white"
            >
              Login
            </NavLink>

            <NavLink
              to="/auth/register"
              className="btn rounded-full bg-gradient-to-r from-pink-500 to-red-600 text-white"
            >
              Register
            </NavLink>
          </>
        )}

        {/* If logged in */}
        {user && (
          <>
            {/* Profile Image */}
            <div
              className="tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              <img
                src={user.photoURL || "/default-profile.png"}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-pink-500"
              />
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-outline rounded-full border-red-500 text-red-600 hover:bg-red-600 hover:text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
