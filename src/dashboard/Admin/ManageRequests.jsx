import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";

const ManageRequests = () => {
  useTitle("Manage Requests")
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/role-requests");
      setRequests(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (request, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${newStatus} this request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "approved" ? "#3085d6" : "#d33",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${newStatus} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.patch(
            `http://localhost:3000/role-requests/${request._id}`,
            {
              status: newStatus,
              requestType: request.requestType,
              email: request.userEmail,
            }
          );

          if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", `Request has been ${newStatus}.`, "success");
            fetchRequests();
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to update status", "error");
        }
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Manage Requests: {requests.length}
      </h2>

      <table className="table w-full">
        <thead>
          <tr className="bg-base-200 text-base">
            <th>#</th>
            <th>User Info</th>
            <th>Type / Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req, index) => (
            <tr key={req._id} className="hover:bg-gray-50">
              <th>{index + 1}</th>

              <td>
                <div className="flex flex-col">
                  <span className="font-bold">{req.name || "User"}</span>
                  <span className="text-xs text-gray-500">{req.userEmail}</span>
                </div>
              </td>

              <td className="capitalize font-semibold">{req.requestType}</td>

              <td>
                <span
                  className={`badge ${
                    req.requestStatus === "pending"
                      ? "badge-warning"
                      : req.requestStatus === "approved"
                      ? "badge-success text-white"
                      : "badge-error text-white"
                  } capitalize`}
                >
                  {req.requestStatus}
                </span>
              </td>

              <td>
                {req.requestStatus === "pending" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(req, "approved")}
                      className="btn btn-xs btn-success text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(req, "rejected")}
                      className="btn btn-xs btn-error text-white"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400 font-semibold text-sm">
                    {req.requestStatus === "approved"
                      ? "Completed"
                      : "Rejected"}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {requests.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No requests found.</p>
      )}
    </div>
  );
};

export default ManageRequests;