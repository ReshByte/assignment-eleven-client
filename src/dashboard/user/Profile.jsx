import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // adjust path if needed

const Profile = () => {
  const { user } = useContext(AuthContext);

  // If user is not found (still loading or not logged in)
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Profile...
      </div>
    );
  }

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
          <p><strong>Role:</strong> user</p>
          <p><strong>Status:</strong> active</p>

          {/* Chef ID — Only visible if role = chef */}
          {/* For now you don't have backend role system, so hiding */}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <button className="btn btn-warning w-full">Be a Chef</button>
          <button className="btn btn-neutral w-full">Be an Admin</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
