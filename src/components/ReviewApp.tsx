import StarRating from '@/components/StarRating/StarRating';
import { faker } from '@faker-js/faker';
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

  const addNewRating = async (rating: number) => {
    const aPerson = faker.person;
    const author = `${aPerson.firstName()} ${aPerson.lastName().charAt(0)}.`;
    const newReview = {
      author,
      rating,
      review: faker.lorem.sentence(),
    };

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      const addedReview = await response.json();
      setReviews(prevReviews => [...prevReviews, addedReview]);
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };
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
      <StarRating onRatingSelect={addNewRating} />
    </div>
  );
};

ReviewApp.displayName = 'ReviewApp';
export default ReviewApp;
