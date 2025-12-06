import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const SixCardShow = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/meals/six")
      .then((res) => res.json())
      .then((data) => setMeals(data));
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
        Today’s Featured Meals
      </h1>

      {/* 6 Cards */}
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

            <p className="text-gray-600 mt-1">
              Delivery Area: {meal.deliveryArea}
            </p>

            <Link to={`/meal-details/${meal._id}`}>
              <button className="w-full mt-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-600 text-white font-semibold hover:opacity-90">
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
