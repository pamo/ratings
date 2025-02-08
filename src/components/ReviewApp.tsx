import StarRating from '@/components/StarRating';
import Review from '@/data/Review';
import { useEffect, useState } from 'react';

const ReviewApp = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      setReviews(data);
    };

    fetchReviews();
  }, []);

  return (
    <div>
      {reviews.map(review => (
        <div key={review.id}>
          <h3>{review.author}</h3>
          <StarRating rating={review.rating} />
          {review.review && <p>{review.review}</p>}
        </div>
      ))}
    </div>
  );
};

ReviewApp.displayName = 'ReviewApp';
export default ReviewApp;
