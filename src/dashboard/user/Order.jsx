// src/pages/Order.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaClock, FaUser, FaDollarSign, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const Order = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`http://localhost:3000/orders/${user.email}`);
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user.email]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600 text-lg">Loading Orders...</p>;
  if (!orders.length)
    return <p className="text-center mt-10 text-gray-600 text-lg">No orders found!</p>;

  const renderStatus = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      preparing: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          styles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderPayment = (payment) => {
    return payment === "Paid" ? (
      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-200 text-green-900 flex items-center gap-1">
        <FaCheckCircle /> Paid
      </span>
    ) : (
      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-200 text-red-900 flex items-center gap-1">
        <FaTimesCircle /> Pending
      </span>
    );
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    Swal.fire({
      title: `Order Details: ${order.mealName}`,
      html: `
        <p><strong>Price:</strong> $${order.price}</p>
        <p><strong>Quantity:</strong> ${order.quantity}</p>
        <p><strong>Chef ID:</strong> ${order.chefId || "N/A"}</p>
        ${order.chefName ? `<p><strong>Chef Name:</strong> ${order.chefName}</p>` : ""}
        <p><strong>Ordered At:</strong> ${new Date(order.orderTime).toLocaleString()}</p>
        <p><strong>Order Status:</strong> ${order.orderStatus}</p>
        <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
      `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Close",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
        >
          <h2 className="text-2xl font-bold mb-3 text-gradient bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
            {order.mealName}
          </h2>

          <div className="flex flex-wrap gap-2 mb-3">
            {renderStatus(order.orderStatus)}
            {renderPayment(order.paymentStatus)}
          </div>

          <p className="text-gray-700 mb-1 flex items-center gap-2">
            <FaDollarSign className="text-gray-500" /> <strong>Price:</strong> ${order.price}
          </p>
          <p className="text-gray-700 mb-1 flex items-center gap-2">
            <FaUser className="text-gray-500" /> <strong>Quantity:</strong> {order.quantity}
          </p>
          <p className="text-gray-700 mb-1 flex items-center gap-2">
            <FaClock className="text-gray-500" /> <strong>Ordered At:</strong>{" "}
            {new Date(order.orderTime).toLocaleString()}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Chef ID:</strong> {order.chefId || "N/A"}
          </p>
          {order.chefName && (
            <p className="text-gray-700 mb-1">
              <strong>Chef Name:</strong> {order.chefName}
            </p>
          )}

          <button
            onClick={() => handleViewDetails(order)}
            className="mt-4 w-full py-2 bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold rounded-full hover:opacity-90 transition"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default Order;
