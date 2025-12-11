import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:3000/user/${user.email}`)
        .then(res => {
          setDbUser(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleRequest = async (type) => {
    const requestData = {
      userName: dbUser?.name || user?.displayName,
      userEmail: user?.email,
      requestType: type,
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    try {
      const res = await axios.post("http://localhost:3000/role-requests", requestData);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Request Sent",
          text: `Your request to become a ${type} has been submitted.`,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Notice",
          text: res.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit request.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full p-4 lg:p-10 bg-base-100">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body items-center text-center">
          <div className="avatar mb-4">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img 
                src={dbUser?.image || user?.photoURL || "https://i.ibb.co/sbgQDK7/user.png"} 
                alt="Profile" 
              />
            </div>
          </div>
          
          <h2 className="card-title text-3xl font-bold mb-1">
            {dbUser?.name || user?.displayName}
          </h2>
          <div className="badge badge-secondary badge-outline mb-6">
            {dbUser?.role || "User"}
          </div>

          <div className="w-full text-left space-y-3 bg-base-200 p-6 rounded-xl">
            <div className="flex justify-between border-b border-base-300 pb-2">
              <span className="font-semibold text-gray-500">Email:</span>
              <span className="text-gray-700 font-medium break-all">{user?.email}</span>
            </div>
            
            <div className="flex justify-between border-b border-base-300 pb-2">
              <span className="font-semibold text-gray-500">Address:</span>
              <span className="text-gray-700 font-medium">
                {dbUser?.address || "Not Provided"}
              </span>
            </div>

            <div className="flex justify-between border-b border-base-300 pb-2">
              <span className="font-semibold text-gray-500">Status:</span>
              <span className={`font-bold ${dbUser?.status === 'fraud' ? 'text-red-500' : 'text-green-500'}`}>
                {dbUser?.status || "Active"}
              </span>
            </div>

            {dbUser?.role === "chef" && (
              <div className="flex justify-between border-b border-base-300 pb-2">
                <span className="font-semibold text-gray-500">Chef ID:</span>
                <span className="text-primary font-bold">{dbUser?.chefId}</span>
              </div>
            )}
          </div>

          <div className="card-actions flex-col w-full gap-3 mt-6">
            {dbUser?.role !== "admin" && (
              <>
                {dbUser?.role !== "chef" && (
                  <button 
                    onClick={() => handleRequest("chef")}
                    className="btn btn-primary w-full text-white"
                  >
                    Be a Chef
                  </button>
                )}
                
                <button 
                  onClick={() => handleRequest("admin")}
                  className="btn btn-neutral w-full"
                >
                  Be an Admin
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;