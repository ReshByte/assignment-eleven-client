import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const OrderRequest = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user?.email) {
                try {
                    setLoading(true);
                    const res = await axios.get(`http://localhost:3000/orders/chef-email/${user.email}`);
                    setOrders(res.data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchOrders();
    }, [user]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const res = await axios.patch(`http://localhost:3000/orders/${orderId}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", `Order ${newStatus}`, "success");
                const updatedOrders = orders.map(order => 
                    order._id === orderId ? { ...order, orderStatus: newStatus } : order
                );
                setOrders(updatedOrders);
            }
        } catch (error) {
            Swal.fire("Error", "Failed to update status", "error");
        }
    };

    if (loading) return <div className="text-center py-10">Loading Orders...</div>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-pink-700">Order Requests</h2>
            
            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => (
                        <div key={order._id} className="border p-4 rounded-lg shadow-sm bg-pink-50 relative">
                            <h3 className="text-lg font-bold">{order.mealName}</h3>
                            <p className="text-sm text-gray-600">Qty: {order.quantity} | Total: ${order.price * order.quantity}</p>
                            <p className="text-xs text-gray-500 mt-1">User: {order.userEmail}</p>
                            <p className="text-xs text-gray-500">Address: {order.userAddress}</p>
                            
                            <div className="mt-2 mb-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold 
                                    ${order.orderStatus === 'pending' ? 'bg-yellow-200 text-yellow-800' : 
                                      order.orderStatus === 'accepted' ? 'bg-blue-200 text-blue-800' : 
                                      order.orderStatus === 'delivered' ? 'bg-green-200 text-green-800' : 
                                      'bg-red-200 text-red-800'}`}>
                                    Status: {order.orderStatus.toUpperCase()}
                                </span>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => handleStatusChange(order._id, "cancelled")}
                                    disabled={order.orderStatus === "cancelled" || order.orderStatus === "delivered" || order.orderStatus === "accepted"}
                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => handleStatusChange(order._id, "accepted")}
                                    disabled={order.orderStatus !== "pending"}
                                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Accept
                                </button>

                                <button
                                    onClick={() => handleStatusChange(order._id, "delivered")}
                                    disabled={order.orderStatus !== "accepted"}
                                    className="px-3 py-1 bg-green-500 text-white text-sm rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Deliver
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderRequest;