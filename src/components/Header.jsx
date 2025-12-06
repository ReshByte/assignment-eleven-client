import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [showTooltip, setShowTooltip] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md font-medium tracking-wide transition-all duration-300 block text-center ${
      isActive
        ? "bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-sm"
        : "text-gray-700 hover:text-pink-500 hover:bg-pink-50"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <nav className="flex items-center justify-between py-3">
          {/* LOGO */}
          <NavLink
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent"
          >
            LocalChefBazaar
          </NavLink>

          {/* NAV LINKS */}
          <ul className="hidden md:flex items-center gap-3">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/meal" className={navLinkClass}>
                Meals
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>

          {/* AUTH / PROFILE */}
          <div className="flex items-center gap-3">
            {!user ? (
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
            ) : (
              <>
                {/* PROFILE IMAGE WITH TOOLTIP */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onTouchStart={() => setShowTooltip(!showTooltip)}
                >
                  <img
                    src={user.photoURL || "/default-profile.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-pink-500 cursor-pointer"
                  />
                  {showTooltip && (
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-pink-600 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
                      {user.displayName || "User"}
                    </div>
                  )}
                </div>

                {/* LOGOUT BUTTON */}
                <button
                  onClick={signOutUser}
                  className="btn btn-outline rounded-full border-red-500 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
