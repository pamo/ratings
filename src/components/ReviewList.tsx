import React from 'react';
import Review from '@/data/Review';
import StarRating from '@/components/StarRating/StarRating';

interface ReviewListProps {
  reviews: Review[];
  newReviewId: number | null;
}

function ReviewList({ reviews, newReviewId }: ReviewListProps) {
  return (
    <div className="space-y-4">
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div
            key={review.id}
            className={`p-4 bg-white rounded-lg shadow-md hover:shadow-lg mx-auto my-6 box-border max-w-screen-lg transition-all ${review.id === newReviewId ? 'animate-fade-in' : ''}`}
          >
            <h3>{review.author}</h3>
            <StarRating rating={review.rating} />
            {review.review && <p className="text-balance">{review.review}</p>}
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

ReviewList.displayName = 'ReviewList';
export default ReviewList;
