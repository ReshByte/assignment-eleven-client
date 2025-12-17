import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import useTitle from "../../hooks/useTitle";

const Favorite = () => {
  useTitle("Favorite");
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`https://assignment-eleven-server-lemon.vercel.app/favorites/${user.email}`);
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
      confirmButtonColor: "#ec4899", // pink-500
      cancelButtonColor: "#f43f5e", // pink-600
      confirmButtonText: "Yes, remove it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://assignment-eleven-server-lemon.vercel.app/favorites/${id}`, { method: "DELETE" });
        const data = await res.json();

        if (data.success) {
          setFavorites((prev) => prev.filter((fav) => fav._id !== id));
          Swal.fire("Removed!", data.message, "success");
        } else {
          Swal.fire("Error", data.message, "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to remove meal from favorites.", "error");
      }
    }
  };

  if (loading)
    return <p className="mt-6 text-center text-gray-500">Loading favorite meals...</p>;
  if (favorites.length === 0)
    return <p className="mt-6 text-center text-gray-500">No favorite meals yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-700">
        Favorite Meals
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg border border-pink-200">
        <table className="min-w-full bg-white">
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
              <tr
                key={fav._id}
                className="border-b hover:bg-pink-50 transition-colors"
              >
                <td className="py-4 px-6 font-medium text-gray-700">{fav.mealName}</td>
                <td className="py-4 px-6 text-gray-600">{fav.chefName}</td>
                <td className="py-4 px-6 font-semibold text-pink-600">{fav.price ? `${fav.price}` : "N/A"}</td>
                <td className="py-4 px-6 text-gray-500">{new Date(fav.addedTime).toLocaleDateString()}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleDelete(fav._id)}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg shadow-md hover:from-pink-600 hover:to-pink-800 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {favorites.map((fav) => (
          <div
            key={fav._id}
            className="bg-white rounded-xl shadow-lg border border-pink-200 p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-pink-600">{fav.mealName}</h2>
              <span className="text-gray-500">{new Date(fav.addedTime).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-600">Chef: {fav.chefName}</p>
            <p className="font-semibold text-pink-600">Price: ${fav.price ? `${fav.price}` : "N/A"}</p>
            <button
              onClick={() => handleDelete(fav._id)}
              className="mt-2 py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg shadow-md hover:from-pink-600 hover:to-pink-800 transition-all"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
// 