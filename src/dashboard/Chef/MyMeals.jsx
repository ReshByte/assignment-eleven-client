import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import useTitle from "../../hooks/useTitle";

const MyMeals = () => {
  useTitle("Chef Meal");
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMeal, setEditingMeal] = useState(null);

  const { register, handleSubmit, setValue } = useForm();

  // Fetch meals by chef
  const fetchMeals = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(`http://localhost:3000/meals/chef/${user.email}`);
      setMeals(res.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [user]);

  // Delete meal
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#f43f5e",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:3000/meals/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Meal has been deleted.", "success");
          fetchMeals();
        }
      } catch (error) {
        console.error("Error deleting meal:", error);
        Swal.fire("Error", "Failed to delete meal.", "error");
      }
    }
  };

  // Open edit modal
  const handleEdit = (meal) => {
    setEditingMeal(meal);
    setValue("foodName", meal.foodName);
    setValue("chefName", meal.chefName);
    setValue("price", meal.price);
    setValue("ingredients", meal.ingredients.join(","));
    setValue("estimatedDeliveryTime", meal.estimatedDeliveryTime);
    setValue("chefExperience", meal.chefExperience);
    setValue("chefId", meal.chefId);
  };

  // Update meal
  const onUpdate = async (data) => {
    try {
      const updatedMeal = {
        ...data,
        price: parseFloat(data.price),
        ingredients: data.ingredients.split(","),
        rating: editingMeal.rating || 0,
        foodImage: editingMeal.foodImage,
      };
      const res = await axios.patch(`http://localhost:3000/meals/${editingMeal._id}`, updatedMeal);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Meal updated successfully!", "success");
        setEditingMeal(null);
        fetchMeals();
      }
    } catch (error) {
      console.error("Error updating meal:", error);
      Swal.fire("Error", "Failed to update meal", "error");
    }
  };

  if (loading) return <div className="text-center mt-10 text-pink-500 font-bold">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Centered Gradient Title */}
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
        My Meals
      </h2>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.length === 0 && <p className="col-span-full text-center text-gray-500">No meals found</p>}
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all flex flex-col"
          >
            <div className="overflow-hidden">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="h-56 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-pink-500">{meal.foodName}</h3>
                <p className="text-gray-700 mt-1">Price: <span className="font-semibold">${meal.price}</span></p>
                <p className="text-gray-700">Rating: <span className="font-semibold">{meal.rating || 0}</span></p>
                <p className="text-gray-700">Ingredients: <span className="font-semibold">{meal.ingredients.join(", ")}</span></p>
                <p className="text-gray-700">Delivery: <span className="font-semibold">{meal.estimatedDeliveryTime}</span></p>
                <p className="text-gray-700">Chef: <span className="font-semibold">{meal.chefName}</span></p>
              </div>
              <div className="mt-5 flex justify-between gap-3">
                <button
                  onClick={() => handleEdit(meal)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-pink-500 transition-all"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(meal._id)}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-2xl">
            <h3 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
              Update Meal
            </h3>
            <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
              <input {...register("foodName", { required: true })} placeholder="Food Name" className="input input-bordered w-full" />
              <input {...register("chefName", { required: true })} placeholder="Chef Name" className="input input-bordered w-full" />
              <input {...register("price", { required: true })} type="number" step="0.01" placeholder="Price" className="input input-bordered w-full" />
              <textarea {...register("ingredients", { required: true })} placeholder="Ingredients (comma separated)" className="textarea textarea-bordered w-full" />
              <input {...register("estimatedDeliveryTime", { required: true })} placeholder="Estimated Delivery Time" className="input input-bordered w-full" />
              <input {...register("chefExperience", { required: true })} placeholder="Chef Experience" className="input input-bordered w-full" />
              <input {...register("chefId", { required: true })} placeholder="Chef ID" className="input input-bordered w-full" />

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setEditingMeal(null)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-pink-500 transition-all">
                  Update Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMeals;
