import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({ rating: "", comment: "" });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/reviews");
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch reviews.", "error");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/reviews/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          Swal.fire("Deleted!", data.message, "success");
          fetchReviews();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete review.", "error");
      }
    }
  };

  const handleEditClick = (review) => {
    setEditingReview(review);
    setFormData({ rating: review.rating, comment: review.comment });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/reviews/${editingReview._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("Updated!", data.message, "success");
        setEditingReview(null);
        fetchReviews();
      } else {
        Swal.fire("Error", "Failed to update review.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update review.", "error");
    }
  };

  if (loading) return <p className="mt-4 text-center text-gray-500">Loading reviews...</p>;
  if (reviews.length === 0) return <p className="mt-4 text-center text-gray-500">No reviews yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-600">
        Review
      </h1>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-3 md:mb-0">
              <img
                src={review.reviewerImage || "https://via.placeholder.com/50"}
                alt={review.reviewerName || "Reviewer"}
                className="w-14 h-14 rounded-full border-2 border-pink-500"
              />
              <div>
                <p className="font-semibold text-lg">{review.reviewerName || "Anonymous"}</p>
                <p className="text-sm text-gray-500">
                  {review.date ? new Date(review.date).toLocaleDateString() : "Unknown date"}
                </p>
              </div>
            </div>
            <div className="flex-1 md:ml-6 mb-3 md:mb-0">
              <p className="text-yellow-500 font-semibold text-lg">⭐ {review.rating || 0} / 5</p>
              <p className="text-gray-700 mt-1">{review.comment || "No comment"}</p>
            </div>
            <div className="flex gap-2 mt-3 md:mt-0">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
                onClick={() => handleDelete(review._id)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                onClick={() => handleEditClick(review)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-600">
              Edit Review
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Comment</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="textarea textarea-bordered w-full"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-neutral"
                  onClick={() => setEditingReview(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
