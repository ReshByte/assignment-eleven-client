import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const OrderRequest = ({ chefId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await axios.get(`http://localhost:3000/orders/chef/${chefId}`);
    setOrders(res.data);
  };

  const acceptOrder = async (id) => {
    await axios.patch(`http://localhost:3000/orders/${id}`, {
      status: "accepted",
    });
    Swal.fire("Accepted", "Order accepted", "success");
    loadOrders();
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Meal</th>
          <th>User</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order._id}>
            <td>{order.mealName}</td>
            <td>{order.userEmail}</td>
            <td>{order.userAddress}</td>
            <td>
              {order.orderStatus === "pending" && (
                <button onClick={() => acceptOrder(order._id)} className="btn btn-success btn-sm">
                  Accept
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderRequest;
