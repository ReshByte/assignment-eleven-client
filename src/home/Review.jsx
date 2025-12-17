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
      const res = await fetch("https://assignment-eleven-server-lemon.vercel.app/reviews");
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
        await fetch(`https://assignment-eleven-server-lemon.vercel.app/reviews/${id}`, { method: "DELETE" });
        setReviews((prev) => prev.filter((r) => r._id !== id));
        Swal.fire("Deleted!", "Review deleted successfully", "success");
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
      await fetch(`https://assignment-eleven-server-lemon.vercel.app/reviews/${editingReview._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setReviews((prev) =>
        prev.map((r) =>
          r._id === editingReview._id ? { ...r, ...formData } : r
        )
      );

      setEditingReview(null);
      Swal.fire("Updated!", "Review updated successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update review.", "error");
    }
  };

  if (loading)
    return <p className="mt-6 text-center text-pink-400 text-lg">Loading reviews...</p>;
  if (reviews.length === 0)
    return <p className="mt-6 text-center text-pink-400 text-lg">No reviews yet.</p>;

  return (
    <div className="mx-auto p-8 ">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-700">
        Reviews
      </h1>

      <div className="space-y-8">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 border-2 border-pink-300 rounded-2xl shadow-lg bg-pink-50 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <img
                src={review.reviewerImage || "https://via.placeholder.com/60"}
                alt={review.reviewerName || "Reviewer"}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-pink-400 shadow-md"
              />
              <div>
                <p className="font-semibold text-lg md:text-xl text-pink-600">{review.reviewerName || "Anonymous"}</p>
                <p className="text-sm md:text-base text-pink-400">
                  {review.date ? new Date(review.date).toLocaleDateString() : "Unknown date"}
                </p>
              </div>
            </div>
            <div className="flex-1 md:ml-8 mb-4 md:mb-0">
              <p className="text-yellow-500 font-semibold text-lg md:text-xl">⭐ {review.rating || 0} / 5</p>
              <p className="text-pink-700 mt-2 md:mt-3 text-base md:text-lg">{review.comment || "No comment"}</p>
            </div>
            <div className="flex gap-3 md:gap-4 mt-4 md:mt-0">
              <button
                onClick={() => handleDelete(review._id)}
                className="px-5 py-2 md:px-6 md:py-3 bg-pink-500 text-white rounded-xl shadow-md hover:bg-pink-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditClick(review)}
                className="px-5 py-2 md:px-6 md:py-3 bg-pink-600 text-white rounded-xl shadow-md hover:bg-pink-700 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-pink-50 p-8 rounded-2xl w-96 md:w-[500px] shadow-2xl border-2 border-pink-300">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-700">
              Edit Review
            </h2>
            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block font-semibold mb-2 text-lg text-pink-600">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="input input-bordered w-full text-lg border-pink-400"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-lg text-pink-600">Comment</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="textarea textarea-bordered w-full text-lg border-pink-400"
                  rows={5}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" className="btn btn-neutral px-6 py-2" onClick={() => setEditingReview(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white">
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
