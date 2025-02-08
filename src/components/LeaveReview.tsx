import React, { useState } from 'react';
import StarRating from '@/components/StarRating/StarRating';
import { faker } from '@faker-js/faker';
import Review from '@/data/Review';

interface LeaveReviewProps {
  onReviewSubmit: (review: Review) => void;
}

function LeaveReview({ onReviewSubmit }: LeaveReviewProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addNewRating = async (rating: number) => {
    const aPerson = faker.person;
    const author = `${aPerson.firstName()} ${aPerson.lastName().charAt(0)}.`;
    const newReview = {
      author,
      rating,
      review: faker.lorem.sentence(),
    };

    setIsSaving(true);
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
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2>Leave your own review</h2>
      <StarRating onRatingSelect={addNewRating} />
      {isSaving && <p>Saving...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

LeaveReview.displayName = 'LeaveReview';
export default LeaveReview;
