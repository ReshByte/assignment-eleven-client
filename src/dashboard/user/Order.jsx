import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import useTitle from "../../hooks/useTitle";

const Order = () => {
  useTitle("Order")
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/orders/${user.email}`)
      .then(res => setOrders(res.data));
  }, [user]);

  const handlePay = async (order) => {
    const res = await axios.post(
      "http://localhost:3000/create-checkout-session",
      {
        orderId: order._id,
        price: order.price * order.quantity,
        mealName: order.mealName,
        email: user.email,
      }
    );

    window.location.href = res.data.url;
  };

  return (
    <div className="overflow-x-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-700">
        My Orders ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No orders yet.
        </p>
      ) : (
        <table className="table w-full table-zebra">
          <thead>
            <tr className="bg-pink-100 text-pink-800">
              <th>#</th>
              <th>Meal</th>
              <th>Total</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-pink-50">
                <td>{index + 1}</td>

                <td className="font-semibold">
                  {order.mealName}
                </td>

                <td className="font-medium">
                  ${(order.price * order.quantity).toFixed(2)}
                </td>

                <td>
                  <span
                    className={`badge ${
                      order.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                <td>
                  {order.orderStatus === "accepted" &&
                  order.paymentStatus === "pending" ? (
                    <button
                      onClick={() => handlePay(order)}
                      className="btn btn-sm border-0 bg-gradient-to-r from-pink-500 to-pink-700 text-white hover:opacity-90"
                    >
                      Pay Now
                    </button>
                  ) : order.paymentStatus === "paid" ? (
                    <span className="text-green-600 font-bold">
                      Paid ✓
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
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
