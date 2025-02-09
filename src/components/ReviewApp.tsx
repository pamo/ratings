import StarRating from '@/components/StarRating/StarRating';
import { useEffect, useState } from 'react';

import Review from '@/data/Review';
import LeaveReview from './LeaveReview';
import ReviewList from './ReviewList/ReviewList';

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

  const handleReviewSubmit = (newReview: Review) => {
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <ReviewList reviews={reviews} />
      <LeaveReview onReviewSubmit={handleReviewSubmit} />
    </div>
  );
};

ReviewApp.displayName = 'ReviewApp';
export default ReviewApp;
