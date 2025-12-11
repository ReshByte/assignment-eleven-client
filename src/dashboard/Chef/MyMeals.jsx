import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";


const MyMeals = () => {
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    if (!user?.email) return;
    const token = localStorage.getItem("access-token");
    try {
      const res = await axios.get(`http://localhost:3000/meals/chef/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMeals(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [user]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("access-token");
        const res = await axios.delete(`http://localhost:3000/meals/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your meal has been deleted.", "success");
          fetchMeals();
        }
      }
    });
  };

  if (loading) return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <div key={meal._id} className="card bg-base-100 shadow-xl border">
          <figure><img src={meal.foodImage} alt={meal.foodName} className="h-48 w-full object-cover" /></figure>
          <div className="card-body">
            <h2 className="card-title">{meal.foodName}</h2>
            <p>Price: ${meal.price}</p>
            <p>Likes: {meal.likes || 0}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-info btn-sm">Update</button>
              <button onClick={() => handleDelete(meal._id)} className="btn btn-error btn-sm text-white">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyMeals;