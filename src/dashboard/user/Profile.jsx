// src/dashboard/user/Profile.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Profile...
      </div>
    );
  }

  const handleRequest = async (type) => {
    setLoading(true);
    const requestData = {
      _id: user.uid, // assuming Firebase uid
      userName: user.displayName || "Unknown User",
      userEmail: user.email,
      requestType: type,
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3000/role-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("Success", `Request to become ${type} submitted!`, "success");
      } else {
        Swal.fire("Error", data.message || "Failed to submit request", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 space-y-4">
        {/* User Image */}
        <div className="flex justify-center">
          <img
            src={user.photoURL || "https://i.ibb.co/sbgQDK7/user.png"}
            alt="User"
            className="w-28 h-28 rounded-full border"
          />
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold text-center">{user.displayName || "Unknown User"}</h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> Not Provided</p>
          <p><strong>Role:</strong> {user.role || "user"}</p>
          <p><strong>Status:</strong> {user.status || "active"}</p>
          {user.role === "chef" && <p><strong>Chef ID:</strong> {user.chefId}</p>}
        </div>

        {/* Conditional Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          {user.role !== "chef" && user.role !== "admin" && (
            <button
              disabled={loading}
              onClick={() => handleRequest("chef")}
              className="btn btn-warning w-full"
            >
              Be a Chef
            </button>
          )}
          {user.role !== "admin" && (
            <button
              disabled={loading}
              onClick={() => handleRequest("admin")}
              className="btn btn-neutral w-full"
            >
              Be an Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
