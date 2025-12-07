// src/dashboard/Dashboard.jsx
import React, { useContext } from "react";
import { FaUser, FaShoppingBag, FaStar, FaHeart, FaUtensils, FaClipboardList, FaUsers, FaTasks } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300 px-4">
          <label
            htmlFor="dashboard-drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </label>
          <div className="text-xl font-semibold">Dashboard</div>
        </nav>

        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col bg-base-200 w-64 p-2">
          <ul className="menu w-full grow p-2">

            {/* My Profile */}
            <li>
              <NavLink to="profile" className="flex items-center gap-3">
                <FaUser /> My Profile
              </NavLink>
            </li>

            {/* USER MENU (default) */}
            {user.role !== "chef" && user.role !== "admin" && (
              <>
                <li>
                  <NavLink to="order" className="flex items-center gap-3">
                    <FaShoppingBag /> My Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to="myReview" className="flex items-center gap-3">
                    <FaStar /> My Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink to="favorite" className="flex items-center gap-3">
                    <FaHeart /> Favorite Meal
                  </NavLink>
                </li>
              </>
            )}

            {/* CHEF MENU */}
            {user.role === "chef" && (
              <>
                <li>
                  <NavLink to="create-meal" className="flex items-center gap-3">
                    <FaUtensils /> Create Meal
                  </NavLink>
                </li>
                <li>
                  <NavLink to="my-meals" className="flex items-center gap-3">
                    <FaClipboardList /> My Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="order-requests" className="flex items-center gap-3">
                    <FaTasks /> Order Requests
                  </NavLink>
                </li>
              </>
            )}

            {/* ADMIN MENU */}
            {user.role === "admin" && (
              <>
                <li>
                  <NavLink to="manage-user" className="flex items-center gap-3">
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="manage-requests" className="flex items-center gap-3">
                    <FaTasks /> Manage Requests
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
