import React from "react";
import { FaUser, FaShoppingBag, FaStar, FaHeart } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="dashboard-drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            {/* Sidebar icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="inline-block size-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
          <div className="px-4 text-xl font-semibold">User Dashboard</div>
        </nav>

        {/* Page content */}
        <div className="p-6 text-xl font-medium">Select any option from the sidebar</div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-64 duration-300">

          <ul className="menu w-full grow p-2">

            {/* My Profile */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                data-tip="My Profile"
              >
                <FaUser className="text-lg" />
                <span className="is-drawer-close:hidden">My Profile</span>
              </button>
            </li>

            {/* My Orders */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                data-tip="My Orders"
              >
                <FaShoppingBag className="text-lg" />
                <span className="is-drawer-close:hidden">My Orders</span>
              </button>
            </li>

            {/* My Reviews */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                data-tip="My Reviews"
              >
                <FaStar className="text-lg" />
                <span className="is-drawer-close:hidden">My Reviews</span>
              </button>
            </li>

            {/* Favorite Meal */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                data-tip="Favorite Meal"
              >
                <FaHeart className="text-lg" />
                <span className="is-drawer-close:hidden">Favorite Meal</span>
              </button>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
