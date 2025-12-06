// src/pages/Meal.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Meal = () => {
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10; // 10 items per page

  // Fetch meals with pagination + sorting
  const getMeals = () => {
    fetch(
      `http://localhost:3000/meals?page=${currentPage}&limit=${limit}&sort=${sortOrder}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals);
        setTotalPages(data.totalPages);
      });
  };

  useEffect(() => {
    getMeals();
  }, [currentPage, sortOrder]);

  // Toggle sorting
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
        All Meals
      </h1>

      {/* Sort button */}
      <div className="flex justify-end mb-5">
        <button
          onClick={handleSort}
          className="btn bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-full px-5"
        >
          Sort by Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
        </button>
      </div>

      {/* Meals cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-xl shadow-lg p-5 border border-pink-100 hover:shadow-xl transition-transform hover:-translate-y-2"
          >
            <img
              src={meal.foodImage}
              alt={meal.chefName}
              className="w-full h-52 object-cover rounded-lg"
            />

            <h2 className="text-2xl font-bold mt-3">{meal.chefName}</h2>
            <p className="text-gray-500">Chef ID: {meal.chefId}</p>

            <p className="text-lg font-bold text-pink-600 mt-2">
              Price: {meal.price}
            </p>

            <p className="text-yellow-500 font-semibold">
              ⭐ {meal.rating} / 5
            </p>

            <p className="text-gray-600">Delivery Area: {meal.deliveryArea}</p>

            <Link to={`/meal-details/${meal._id}`}>
              <button className="w-full mt-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-600 text-white font-semibold hover:opacity-90">
                See Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10 items-center gap-2">

        {/* Prev */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-pink-600 border-pink-500"
          }`}
        >
          Prev
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === num
                ? "bg-pink-600 text-white"
                : "bg-white text-pink-600 border-pink-500"
            }`}
          >
            {num}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-pink-600 border-pink-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Meal;
