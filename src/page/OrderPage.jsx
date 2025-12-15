import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";

const OrderPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: { quantity: 1, address: "" }
    });

    useEffect(() => {
        const loadMeal = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/meal-details/${id}`);
                setMeal(res.data);
                setValue("quantity", 1);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadMeal();
    }, [id, setValue]);

    const onSubmit = async (formData) => {
        if (!meal) return;

        const priceString = meal.price.toString().replace(/[^0-9.]/g, "");
        const price = parseFloat(priceString);
        const qty = parseInt(formData.quantity, 10);
        const totalPrice = price * qty;

        Swal.fire({
            title: `Total Price: $${totalPrice}`,
            text: "Do you want to confirm the order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, confirm",
            confirmButtonColor: "#ec4899"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const orderData = {
                    foodId: meal._id,
                    mealName: meal.foodName,
                    price: price,
                    quantity: qty,
                    chefId: meal.chefId,
                    chefName: meal.chefName,
                    chefEmail: meal.userEmail,
                    paymentStatus: "pending",
                    orderStatus: "pending",
                    userEmail: user.email,
                    userAddress: formData.address,
                    orderTime: new Date().toISOString(),
                };

                try {
                    const token = localStorage.getItem("access-token");
                    const res = await axios.post("http://localhost:3000/orders", orderData, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (res.data.insertedId) {
                        Swal.fire("Success", "Order placed successfully!", "success");
                        navigate("/dashboard/my-orders");
                    }
                } catch (err) {
                    Swal.fire("Error", "Order failed!", "error");
                }
            }
        });
    };

    if (loading) return <p className="text-center p-10">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10 border border-pink-100">
            <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">Confirm Order</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-semibold">Meal Name</label>
                    <input value={meal?.foodName} disabled className="w-full p-2 border rounded bg-gray-100" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold">Price ($)</label>
                        <input value={meal?.price} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                    <div>
                        <label className="block font-semibold">Chef ID</label>
                        <input value={meal?.chefId} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                </div>
                <div>
                    <label className="block font-semibold">Your Email</label>
                    <input value={user?.email} disabled className="w-full p-2 border rounded bg-gray-100" />
                </div>
                <div>
                    <label className="block font-semibold text-pink-600">Quantity</label>
                    <input
                        type="number"
                        min="1"
                        {...register("quantity", { required: true, min: 1 })}
                        className="w-full p-2 border rounded focus:outline-pink-500"
                    />
                </div>
                <div>
                    <label className="block font-semibold text-pink-600">Delivery Address</label>
                    <textarea
                        {...register("address", { required: true })}
                        className="w-full p-2 border rounded focus:outline-pink-500"
                        rows="3"
                        placeholder="Enter full address..."
                    ></textarea>
                    {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
                </div>

                <button type="submit" className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition">
                    Confirm Order
                </button>
            </form>
        </div>
    );
};

export default OrderPage;