import React, { useState } from 'react';
import StarRating from '@/components/StarRating/StarRating';
import { faker } from '@faker-js/faker';
import Review from '@/data/Review';

interface LeaveReviewProps {
  onReviewSubmit: (review: Review) => void;
}

function LeaveReview({ onReviewSubmit }: LeaveReviewProps) {
  const [error, setError] = useState<string | null>(null);

  const addNewRating = async (rating: number) => {
    const aPerson = faker.person;
    const author = `${aPerson.firstName()} ${aPerson.lastName().charAt(0)}.`;
    const newReview = {
      author,
      rating,
      review: faker.lorem.paragraph(5),
    };

    setError(null);

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
      onReviewSubmit(addedReview);
    } catch (error) {
      setError('Failed to add review. Please try again.');
      console.error('Failed to add review:', error);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Leave your own review</h2>
      <StarRating onRatingSelect={addNewRating} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

LeaveReview.displayName = 'LeaveReview';
export default LeaveReview;
