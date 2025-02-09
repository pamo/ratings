import React from 'react';
import Review from '@/data/Review';
import StarRating from '@/components/StarRating/StarRating';
import styles from './ReviewList.module.css';

interface ReviewListProps {
  reviews: Review[];
}

function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-4">
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id} className={styles.reviewCard}>
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
