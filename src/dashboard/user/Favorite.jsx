import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const Favorite = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/favorites/${user.email}`);
      const data = await res.json();
      setFavorites(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch favorite meals.", "error");
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be removed from your favorites!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // red-500
      cancelButtonColor: "#3b82f6", // blue-500
      confirmButtonText: "Yes, remove it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/favorites/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          Swal.fire("Removed!", "Meal removed from favorites successfully.", "success");
          fetchFavorites();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to remove meal from favorites.", "error");
      }
    }
  };

  if (loading) return <p className="mt-6 text-center text-gray-500">Loading favorite meals...</p>;
  if (favorites.length === 0)
    return <p className="mt-6 text-center text-gray-500">No favorite meals yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-600">
        Favorite Meals
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl shadow-md">
          <thead className="bg-pink-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Meal Name</th>
              <th className="py-3 px-6 text-left">Chef Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Date Added</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((fav) => (
              <tr key={fav._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">{fav.mealName}</td>
                <td className="py-4 px-6">{fav.chefName}</td>
                <td className="py-4 px-6">{fav.price ? `${fav.price}` : "N/A"}</td>
                <td className="py-4 px-6">{new Date(fav.addedTime).toLocaleDateString()}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleDelete(fav._id)}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-lg shadow-md hover:from-pink-600 hover:to-red-700 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Favorite;
