import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const SixCardShow = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("https://assignment-eleven-server-lemon.vercel.app/meals/six")
      .then((res) => res.json())
      .then((data) => setMeals(data));
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-700">
        Today’s Featured Meals
      </h1>

      {/* 6 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-pink-50 rounded-2xl shadow-lg p-5 border-2 border-pink-200 hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300"
          >
            <img
              src={meal.foodImage}
              alt={meal.chefName}
              className="w-full h-52 object-cover rounded-xl border-2 border-pink-300 shadow-md"
            />

            <h2 className="text-2xl font-bold mt-3 text-pink-600">{meal.chefName}</h2>
            <p className="text-pink-400">Chef ID: {meal.chefId}</p>

            <p className="text-lg font-bold text-pink-700 mt-2">
              Price: {meal.price}
            </p>

            <p className="text-yellow-500 font-semibold">
              ⭐ {meal.rating} / 5
            </p>

            <p className="text-pink-500 mt-1">
              Delivery Area: {meal.deliveryArea}
            </p>

            <Link to={`/meal-details/${meal._id}`}>
              <button className="w-full mt-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold hover:opacity-90 shadow-md">
                See Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SixCardShow;
