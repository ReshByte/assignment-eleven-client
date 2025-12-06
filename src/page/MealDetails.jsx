// src/pages/MealDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import Review from "../home/Review"; // Adjust the path if needed

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]); // store reviews here
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Review form states
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  // Fetch meal details and reviews
  useEffect(() => {
    const fetchMealAndReviews = async () => {
      try {
        // Fetch meal details
        const mealRes = await fetch(`http://localhost:3000/meal-details/${id}`);
        const mealData = await mealRes.json();
        setMeal(mealData);

        // Fetch reviews for this meal
        const reviewsRes = await fetch(`http://localhost:3000/reviews?foodId=${id}`);
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
      } catch (err) {
        console.error("Failed to fetch meal or reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMealAndReviews();
  }, [id]);

  // Order button
  const handleOrder = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must login to place an order.",
        confirmButtonColor: "#6366f1",
      }).then(() => navigate("/auth/login", { state: `/meals/${id}` }));
      return;
    }
    navigate(`/order/${id}`);
  };

  // Add to favorite
  const handleFavorite = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must login to add to favorites.",
        confirmButtonColor: "#6366f1",
      }).then(() => navigate("/auth/login", { state: `/meals/${id}` }));
      return;
    }

    const favData = {
      userEmail: user.email,
      mealId: id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
    };

    try {
      const res = await fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favData),
      });
      const data = await res.json();
      Swal.fire({
        icon: data.success ? "success" : "info",
        title: data.success ? "Added to Favorites!" : data.message,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Submit review
  const handleSubmitReview = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must login to submit a review.",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    if (!comment.trim()) {
      Swal.fire({ icon: "error", title: "Comment Required", text: "Please write a review." });
      return;
    }

    const newReview = {
      foodId: id,
      reviewerName: user.displayName || user.email,
      reviewerImage: user.photoURL || "https://i.ibb.co/sample-user.jpg",
      rating,
      comment,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({ icon: "success", title: "Review submitted successfully!" });
        setComment("");
        setRating(5);

        // Append new review to state
        setReviews((prev) => [data.review, ...prev]); 
        // Make sure your backend returns the saved review as `data.review`
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading meal details...</p>;
  if (!meal) return <p className="text-center mt-10 text-red-500">Meal not found!</p>;

  const ingredients = Array.isArray(meal.ingredients)
    ? meal.ingredients.join(", ")
    : meal.ingredients?.split(",").map((i) => i.trim()).join(", ");

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
        {meal.foodName}
      </h1>

      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-lg p-6 border border-pink-100">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-sm"
        />
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-2xl font-bold">{meal.chefName}</h2>
          <p className="text-gray-600">Chef ID: {meal.chefId}</p>
          <p className="text-lg font-semibold text-pink-600">Price: ${meal.price}</p>
          <p className="text-yellow-500 font-semibold">⭐ {meal.rating} / 5</p>
          <p className="text-gray-700"><strong>Ingredients:</strong> {ingredients || "Not specified"}</p>
          <p className="text-gray-700"><strong>Delivery Area:</strong> {meal.deliveryArea}</p>
          <p className="text-gray-700"><strong>Estimated Delivery Time:</strong> {meal.estimatedDeliveryTime || "30-60 mins"}</p>
          <p className="text-gray-700"><strong>Chef’s Experience:</strong> {meal.chefExperience || "Not specified"}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleOrder}
              className="py-2 px-4 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-full font-semibold hover:opacity-90 transition-all"
            >
              Order Now
            </button>

            <button
              onClick={handleFavorite}
              className="py-2 px-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-semibold hover:opacity-90 transition-all"
            >
              Add to Favorite
            </button>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100 mt-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Give a Review</h3>
        <label className="block mb-2 font-medium">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded px-3 py-2 mb-4 w-full"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border rounded px-3 py-2 mb-4"
          rows={4}
        />

        <button
          onClick={handleSubmitReview}
          className="w-full md:w-1/2 mx-auto block bg-gradient-to-r from-pink-500 to-red-600 text-white font-semibold py-2 rounded-full hover:opacity-90 transition-all"
        >
          Submit Review
        </button>
      </div>

      {/* Review Cards */}
      <Review reviews={reviews} />
    </div>
  );
};

export default MealDetails;
