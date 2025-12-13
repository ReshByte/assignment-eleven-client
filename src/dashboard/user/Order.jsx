import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Order = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      const token = localStorage.getItem("access-token");
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/orders/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // সর্ট করে latest first
        const sortedOrders = res.data.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
        setOrders(sortedOrders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const handlePay = (order) => {
    // এখানে তোমার payment gateway (SSLCommerz, Stripe ইত্যাদি) integrate করবে
    alert(`Payment for ${order.mealName} - $${order.price * order.quantity}`);
    // পরে এখানে actual payment logic যোগ করবে
  };

  if (loading) return <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="overflow-x-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-700">
        My Orders ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No orders yet.</p>
      ) : (
        <table className="table w-full table-zebra">
          <thead>
            <tr className="bg-pink-100 text-pink-800">
              <th>#</th>
              <th>Meal Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Transaction ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-pink-50">
                <td>{index + 1}</td>
                <td className="font-semibold">{order.mealName}</td>
                <td>{order.quantity}</td>
                <td>${(order.price * order.quantity).toFixed(2)}</td>
                <td>
                  <span className={`badge ${
                    order.orderStatus === "pending" ? "badge-warning" :
                    order.orderStatus === "accepted" ? "badge-success" :
                    order.orderStatus === "rejected" ? "badge-error" : "badge-ghost"
                  }`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td>
                  <span className={`badge ${order.paymentStatus === "paid" ? "badge-success" : "badge-warning"}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>{order.transactionId || "N/A"}</td>
                <td>
                  {order.orderStatus === "accepted" && order.paymentStatus === "pending" ? (
                    <button
                      onClick={() => handlePay(order)}
                      className="btn btn-sm btn-primary bg-gradient-to-r from-pink-500 to-pink-700 border-0"
                    >
                      Pay Now
                    </button>
                  ) : order.paymentStatus === "paid" ? (
                    <span className="text-success font-bold">Paid ✓</span>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Order;