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
        const res = await axios.get(`http://localhost:3000/orders/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">My Orders: {orders.length}</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200">
            <th>Meal Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Transaction ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.mealName}</td>
              <td>${order.price}</td>
              <td>
                <span className={`badge ${order.orderStatus === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                  {order.orderStatus}
                </span>
              </td>
              <td>{order.transactionId || "N/A"}</td>
              <td>
                {order.paymentStatus === 'pending' && order.orderStatus !== 'cancelled' ? (
                  <button className="btn btn-sm btn-primary">Pay</button>
                ) : (
                  <span className="font-bold text-success">Paid</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;