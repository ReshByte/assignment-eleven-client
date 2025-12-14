import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";

const ManageUsers = () => {
  useTitle("Manage User")
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const token = localStorage.getItem("access-token");
    try {
      const res = await axios.get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMakeFraud = async (id) => {
    const token = localStorage.getItem("access-token");
    try {
      const res = await axios.patch(
        `http://localhost:3000/users/fraud/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "User marked as Fraud", "success");
        fetchUsers();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (loading)
    return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Users: {users.length}</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="capitalize font-bold">{user.role}</td>
              <td>
                <span
                  className={`badge ${
                    user.status === "fraud" ? "badge-error" : "badge-success"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>
                {user.role === "admin" ? (
                  <span className="font-bold text-gray-500">Admin</span>
                ) : user.status === "fraud" ? (
                  <span className="font-bold text-red-500">Marked</span>
                ) : (
                  <button
                    onClick={() => handleMakeFraud(user._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Make Fraud
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
