import React, { useEffect, useState } from "react";
import axios from "axios";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get("http://localhost:3000/reviews");
        console.log("API response:", res.data);

        if (Array.isArray(res.data)) {
          setReviews(res.data);
        } else {
          setReviews([]);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews.");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading)
    return <p className="mt-4 text-center text-gray-500">Loading reviews...</p>;

  if (error)
    return <p className="mt-4 text-center text-red-500">{error}</p>;

  if (!reviews || reviews.length === 0)
    return <p className="mt-4 text-center text-gray-500">No reviews yet.</p>;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map((review) => (
        <div
          key={review._id || review.date}
          className="p-4 border rounded-lg shadow-sm bg-white"
        >
          <div className="flex items-center gap-3 mb-2">
            <img
              src={review.reviewerImage || "https://via.placeholder.com/50"}
              alt={review.reviewerName || "Reviewer"}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{review.reviewerName || "Anonymous"}</p>
              <p className="text-sm text-gray-500">
                {review.date
                  ? new Date(review.date).toLocaleDateString()
                  : "Unknown date"}
              </p>
            </div>
          </div>
          <p className="text-yellow-500 font-semibold">
            ⭐ {review.rating || 0} / 5
          </p>
          <p className="mt-2 text-gray-700">{review.comment || "No comment"}</p>
        </div>
      ))}
    </div>
  );
};

export default Review;
