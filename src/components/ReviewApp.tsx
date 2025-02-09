import { useEffect, useState } from 'react';

import Review from '@/data/Review';
import LeaveReview from './LeaveReview';
import ReviewList from './ReviewList';
import Button from './Button';

const ReviewApp = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [newReviewIds, setNewReviewIds] = useState<number[] | null>(null);

  const fetchReviews = async (page: number) => {
    try {
      const response = await fetch(`/api/reviews?page=${page}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.length < 2) {
        setHasMore(false);
      }
      setReviews(prevReviews => [...prevReviews, ...data]);
      setNewReviewIds(data.map((review: Review) => review.id));
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  useEffect(() => {
    if (page > 0) {
      fetchReviews(page);
    } else {
      setPage(1);
    }
  }, [page]);

  const handleReviewSubmit = (newReview: Review) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
    setNewReviewIds([newReview.id]);
    setTimeout(() => setNewReviewIds(null), 1000);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
      <LeaveReview onReviewSubmit={handleReviewSubmit} />
      <ReviewList reviews={reviews} newReviewIds={newReviewIds} />
      <Button disabled={!hasMore} onClick={handleLoadMore} className="mt-4 p-2">
        Load More
      </Button>
    </div>
  );
};

ReviewApp.displayName = 'ReviewApp';
export default ReviewApp;
