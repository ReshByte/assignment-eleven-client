import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";

const OrderRequest = ({ chefId=1 }) => {
  useTitle("Order Request")
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    
    console.log("Chef ID received:", chefId);
    console.log("Type of chefId:", typeof chefId);

    if (!chefId) {
      console.warn("chefId is missing or falsy!");
      setLoading(false);
      setOrders([]);
      Swal.fire("Warning", "Chef ID not found. Please login again.", "warning");
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching orders for chefId:", chefId);

      const res = await axios.get(`http://localhost:3000/orders/chef/${chefId}`);
      
      console.log("Raw response from server:", res.data);

      const pendingOrders = res.data.filter(order => order.orderStatus === "pending");
      console.log("Filtered pending orders:", pendingOrders);

      setOrders(pendingOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      console.error("Error response:", err.response?.data);

      Swal.fire("Error", "Failed to load orders. Check console for details.", "error");
      setOrders([]);
    } finally {
      setLoading(false); // এটা সবসময় কল হবে
    }
  };

  useEffect(() => {
    console.log("useEffect triggered with chefId:", chefId);
    loadOrders();
  }, [chefId]); 

  // লোডিং UI
  if (loading) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-xl border border-pink-200 text-center">
        <p className="text-xl text-pink-600">Loading pending orders...</p>
        <span className="loading loading-spinner loading-md mt-4"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-pink-200">
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-700">
        Pending Order Requests ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No pending orders right now.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-5 rounded-xl border border-pink-300 bg-pink-50 shadow-md flex justify-between items-center"
            >
              <div className="space-y-1">
                <p className="font-bold text-lg text-pink-700">{order.mealName}</p>
                <p className="text-sm text-gray-600">Customer: {order.userEmail}</p>
                <p className="text-sm text-gray-600">Quantity: {order.quantity || 1}</p>
                <p className="text-sm text-gray-600">Address: {order.userAddress}</p>
                <p className="text-xs text-gray-500">
                  Ordered: {new Date(order.orderTime).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => acceptOrder(order._id)}
                  className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition"
                >
                  Confirm
                </button>
                <button
                  onClick={() => rejectOrder(order._id)}
                  className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // accept & reject functions (আগের মতোই)
  async function acceptOrder(id) {
    try {
      await axios.patch(`http://localhost:3000/orders/${id}`, { status: "accepted" });
      Swal.fire("Success!", "Order confirmed!", "success");
      loadOrders();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to confirm", "error");
    }
  }

  async function rejectOrder(id) {
    try {
      await axios.patch(`http://localhost:3000/orders/${id}`, { status: "rejected" });
      Swal.fire("Rejected", "Order rejected", "info");
      loadOrders();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to reject", "error");
    }
  }
};

export default OrderRequest;