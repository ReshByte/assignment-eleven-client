import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [showTooltip, setShowTooltip] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md font-medium tracking-wide transition-all duration-300 block text-center ${
      isActive
        ? "bg-gradient-to-r from-pink-600 to-pink-800 text-white shadow-md"
        : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <nav className="flex items-center justify-between py-4">
          {/* LOGO */}
          <NavLink
            to="/"
            className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent"
          >
            LocalChefBazaar
          </NavLink>

          {/* NAV LINKS */}
          <ul className="hidden md:flex items-center gap-4">
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
                  className="px-4 py-2 rounded-full border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/auth/register"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-600 to-pink-800 text-white hover:opacity-90 transition"
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
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-pink-600 cursor-pointer shadow-sm"
                  />
                  {showTooltip && (
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-pink-600 text-white text-sm px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                      {user.displayName || "User"}
                    </div>
                  )}
                </div>

                {/* LOGOUT BUTTON */}
                <button
                  onClick={signOutUser}
                  className="px-4 py-2 rounded-full border border-red-500 text-red-600 hover:bg-red-600 hover:text-white transition"
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
