import React, { useContext, useEffect } from "react";
import { 
  FaUser, 
  FaShoppingBag, 
  FaStar, 
  FaHeart, 
  FaUtensils, 
  FaClipboardList, 
  FaUsers, 
  FaTasks, 
  FaChartPie, 
  FaHome,
  FaBars
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";
import useRole from "../hooks/useRole";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [role, roleLoading] = useRole();

  // 🔹 Dynamic Browser Tab Title
  useEffect(() => {
    document.title = "Dashboard | Chef App";
  }, []);

  const getLinkClass = ({ isActive }) => 
    isActive
      ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-lg shadow-md font-medium transition-all"
      : "flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-600 rounded-lg transition-all font-medium";

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open bg-white min-h-screen font-sans">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Drawer Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-white border-b border-gray-200 lg:hidden sticky top-0 z-40 shadow-md">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost text-pink-500">
              <FaBars className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-xl font-bold bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
            LocalChef Dashboard
          </div>
          <div className="flex-none">
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-pink-500 ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL || "https://i.ibb.co/sbgQDK7/user.png"} alt="User" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-8 lg:p-10 bg-white min-h-[calc(100vh-64px)] lg:min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Drawer Sidebar */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex flex-col min-h-full w-72 bg-white text-gray-800 p-4 shadow-xl border-r border-gray-200">
          
          {/* Logo */}
          <div className="flex items-center gap-3 px-4 mb-8 mt-2">
             <div className="p-2 bg-gradient-to-r from-pink-500 to-red-600/20 rounded-lg text-pink-500">
                <FaUtensils className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent tracking-tight">LocalChef</h2>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Bazaar</p>
             </div>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-2 flex-1">
            <li>
              <NavLink to="/dashboard/profile" className={getLinkClass}>
                <FaUser className="text-lg" />
                <span>My Profile</span>
              </NavLink>
            </li>

            {role === "user" && (
              <>
                <li>
                  <NavLink to="/dashboard/my-orders" className={getLinkClass}>
                    <FaShoppingBag className="text-lg" />
                    <span>My Orders</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-reviews" className={getLinkClass}>
                    <FaStar className="text-lg" />
                    <span>My Reviews</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-favorites" className={getLinkClass}>
                    <FaHeart className="text-lg" />
                    <span>Favorite Meals</span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "chef" && (
              <>
                <li>
                  <NavLink to="/dashboard/create-meal" className={getLinkClass}>
                    <FaUtensils className="text-lg" />
                    <span>Create Meal</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-meals" className={getLinkClass}>
                    <FaClipboardList className="text-lg" />
                    <span>My Meals</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/order-requests" className={getLinkClass}>
                    <FaTasks className="text-lg" />
                    <span>Order Requests</span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li>
                  <NavLink to="/dashboard/manage-users" className={getLinkClass}>
                    <FaUsers className="text-lg" />
                    <span>Manage Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-requests" className={getLinkClass}>
                    <FaTasks className="text-lg" />
                    <span>Manage Requests</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/statistics" className={getLinkClass}>
                    <FaChartPie className="text-lg" />
                    <span>Platform Stats</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="divider my-4 border-gray-300"></div>

          <ul className="flex flex-col gap-2">
            <li>
              <NavLink to="/" className={getLinkClass}>
                <FaHome className="text-lg" />
                <span>Home</span>
              </NavLink>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
