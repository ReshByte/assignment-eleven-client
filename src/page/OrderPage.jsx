import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const OrderPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { quantity: 1, address: "" }
  });

  const quantity = watch("quantity");

  useEffect(() => {
    const loadMeal = async () => {
      try {
        const res = await fetch(`http://localhost:3000/meal-details/${id}`);
        const data = await res.json();
        setMeal(data);
        setValue("quantity", 1);
      } catch (error) {
        console.error("Failed to load meal:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMeal();
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    if (!meal) return;

    // Remove $ sign if exists and convert to number
    const price = parseFloat(meal.price.toString().replace(/\$/g, ""));
    const qty = parseInt(formData.quantity, 10);
    if (isNaN(price) || isNaN(qty)) {
      Swal.fire({ icon: "error", title: "Invalid price or quantity!" });
      return;
    }

    const totalPrice = price * qty;

    const result = await Swal.fire({
      title: `Your total price is $${totalPrice}`,
      text: "Do you want to confirm the order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      const orderData = {
        foodId: id,
        mealName: meal.foodName,
        price: price,
        quantity: qty,
        chefId: meal.chefId,
        paymentStatus: "Pending",
        userEmail: user.email,
        userAddress: formData.address,
        orderStatus: "pending",
        orderTime: new Date().toISOString(),
      };

      try {
        const res = await fetch("http://localhost:3000/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
        const data = await res.json();

        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Order placed successfully!",
          });
          navigate("/dashboard/order"); // navigate to Order page
        } else {
          Swal.fire({
            icon: "error",
            title: "Order failed",
            text: data.message,
          });
        }
      } catch (err) {
        console.error("Order error:", err);
        Swal.fire({
          icon: "error",
          title: "Order failed",
          text: "Something went wrong while placing your order.",
        });
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading Order Page...</p>;
  if (!meal) return <p className="text-center text-red-500 mt-10">Meal not found!</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-xl border">
      <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
        Confirm Your Order
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-semibold">Meal Name:</label>
          <input disabled value={meal.foodName} className="w-full border rounded px-3 py-2 bg-gray-100" />
        </div>

        <div>
          <label className="font-semibold">Price:</label>
          <input disabled value={meal.price} className="w-full border rounded px-3 py-2 bg-gray-100" />
        </div>

        <div>
          <label className="font-semibold">Quantity:</label>
          <input type="number" min="1" {...register("quantity", { required: true, min: 1 })} className="w-full border rounded px-3 py-2" />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">Quantity must be at least 1.</p>}
        </div>

        <div>
          <label className="font-semibold">Chef ID:</label>
          <input disabled value={meal.chefId} className="w-full border rounded px-3 py-2 bg-gray-100" />
        </div>

        <div>
          <label className="font-semibold">Your Email:</label>
          <input disabled value={user.email} className="w-full border rounded px-3 py-2 bg-gray-100" />
        </div>

        <div>
          <label className="font-semibold">Delivery Address:</label>
          <textarea {...register("address", { required: true })} className="w-full border rounded px-3 py-2" placeholder="Enter your delivery address" rows={3} />
          {errors.address && <p className="text-red-500 text-sm mt-1">Delivery address is required.</p>}
        </div>

        <button type="submit" className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold rounded-full hover:opacity-90 transition">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default OrderPage;
