import React from "react";

const Review = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="mt-4 text-center text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map((review) => (
        <div key={review._id || review.date} className="p-4 border rounded-lg shadow-sm bg-white">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={review.reviewerImage || "https://via.placeholder.com/50"}
              alt={review.reviewerName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{review.reviewerName}</p>
              <p className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-yellow-500 font-semibold">⭐ {review.rating} / 5</p>
          <p className="mt-2 text-gray-700">{review.comment}</p>
        </div>

        
      ))}
      
    </div>
  );
};

export default Review;
