// src/pages/MealDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("access-token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { rating: 5, comment: "" },
  });

  // Fetch meal details + reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealRes = await fetch(`http://localhost:3000/meal-details/${id}`);
        const mealData = await mealRes.json();
        setMeal(mealData);

        const reviewsRes = await fetch(`http://localhost:3000/reviews/${id}`);
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ORDER NOW BUTTON
  const handleOrder = () => {
    if (!user) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to place an order.",
      }).then(() =>
        navigate("/auth/login", { state: `/meal-details/${id}` })
      );
    }

    navigate(`/order-page/${id}`);
  };

  // ADD TO FAVORITE
  const handleFavorite = async () => {
    if (!user) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must login to add to favorites.",
      }).then(() =>
        navigate("/auth/login", { state: `/meal-details/${id}` })
      );
    }

    const favData = {
      userEmail: user.email,
      mealId: id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      addedTime: new Date(),
    };

    try {
      const res = await fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(favData),
      });

      const data = await res.json();

      Swal.fire({
        icon: data.insertedId ? "success" : "info",
        title: data.insertedId
          ? "Added to Favorites!"
          : data.message || "Already in favorites",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // SUBMIT REVIEW
  const onSubmitReview = async (formData) => {
    if (!user) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must login to submit a review.",
      });
    }

    const newReview = {
      foodId: id,
      reviewerName: user.displayName || user.email,
      reviewerImage: user.photoURL || "https://i.ibb.co/sample-user.jpg",
      rating: Number(formData.rating),
      comment: formData.comment,
      date: new Date(),
    };

    try {
      const res = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      });

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({ icon: "success", title: "Review submitted!" });
        setReviews((prev) => [newReview, ...prev]);
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!meal) return <p className="text-center mt-10 text-red-500">Meal not found!</p>;

  const ingredients = Array.isArray(meal.ingredients)
    ? meal.ingredients.join(", ")
    : meal.ingredients?.split(",").join(", ");

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
        {meal.foodName}
      </h1>

      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-lg p-6 border border-pink-100">
        <img
          src={meal.foodImage}
          alt=""
          className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow"
        />

        <div className="flex-1 space-y-2">
          <p className="text-2xl font-bold">{meal.chefName}</p>
          <p className="text-gray-600">Chef ID: {meal.chefId}</p>
          <p className="text-lg font-semibold text-pink-600">Price: {meal.price}</p>
          <p className="text-yellow-500 font-semibold">⭐ {meal.rating}</p>
          <p><strong>Ingredients:</strong> {ingredients}</p>
          <p><strong>Delivery Area:</strong> {meal.deliveryArea}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleOrder}
              className="py-2 px-4 bg-pink-600 text-white rounded-full"
            >
              Order Now
            </button>

            <button
              onClick={handleFavorite}
              className="py-2 px-4 bg-yellow-500 text-white rounded-full"
            >
              Add to Favorite
            </button>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg border mt-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Write a Review</h3>

        <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
          <select {...register("rating")} className="border px-3 py-2 rounded w-full">
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <textarea
            {...register("comment", { required: "Comment required" })}
            className="border w-full p-3 rounded"
            rows={4}
            placeholder="Write your review..."
          ></textarea>

          {errors.comment && <p className="text-red-500">{errors.comment.message}</p>}

          <button
            className="w-full bg-pink-600 text-white py-2 rounded-full"
            type="submit"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Review List */}
      <div className="mt-8 space-y-4">
        {reviews.length === 0 && <p>No reviews yet.</p>}

        {reviews.map((rev, i) => (
          <div key={i} className="p-4 bg-gray-50 border rounded-lg">
            <div className="flex items-center gap-3">
              <img
                src={rev.reviewerImage}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <p className="font-semibold">{rev.reviewerName}</p>
              <p className="text-yellow-500">⭐ {rev.rating}</p>
            </div>
            <p className="mt-2">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealDetails;
