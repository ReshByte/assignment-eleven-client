import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Meal = () => {
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

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

  // 🔹 Dynamic Browser Tab Title
  useEffect(() => {
    document.title = "All Meals | Chef App";
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-pink-800">
        All Meals
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleSort}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-pink-800 text-white font-semibold shadow hover:opacity-90 transition"
        >
          Sort by Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-5 border border-gray-200 transition-transform hover:-translate-y-1 duration-300"
          >
            <img
              src={meal.foodImage}
              alt={meal.chefName}
              className="w-full h-52 object-cover rounded-xl border border-pink-200 shadow-sm"
            />

            <h2 className="text-2xl font-bold mt-4 text-pink-700">
              {meal.chefName}
            </h2>
            <p className="text-gray-500 mt-1">Chef ID: {meal.chefId}</p>

            <p className="text-lg font-semibold text-pink-600 mt-2">
              Price: ${meal.price}
            </p>

            <p className="text-yellow-500 font-semibold mt-1">
              ⭐ {meal.rating} / 5
            </p>

            <p className="text-gray-600 mt-1">Delivery Area: {meal.deliveryArea}</p>

            <Link to={`/meal-details/${meal._id}`}>
              <button className="w-full mt-4 py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 shadow transition">
                See Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 items-center gap-2 flex-wrap">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-pink-600 border-pink-400 hover:bg-pink-50 transition"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === num
                ? "bg-pink-600 text-white border-pink-600"
                : "bg-white text-pink-600 border-pink-400 hover:bg-pink-50 transition"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-pink-600 border-pink-400 hover:bg-pink-50 transition"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Meal;
