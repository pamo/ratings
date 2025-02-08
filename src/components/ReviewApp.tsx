import StarRating from '@/components/StarRating';
import { useEffect, useState } from 'react';

import styles from './ReviewApp.module.css';
import Review from '@/data/Review';

const ReviewApp = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id} className={styles.review}>
            <h3>{review.author}</h3>
            <StarRating rating={review.rating} />
            {review.review && <p>{review.review}</p>}
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

ReviewApp.displayName = 'ReviewApp';
export default ReviewApp;
