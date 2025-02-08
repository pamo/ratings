import StarInput from '@/components/StarRating/StarInput';
import StarDisplay from '@/components/StarRating/StarDisplay';
import Button from '../Button';
import { useState } from 'react';

interface StarRatingProps {
  rating?: number;
  onRatingSelect?: (rating: number) => void;
}

const StarRating = ({ rating, onRatingSelect }: StarRatingProps) => {
  const [selectedRating, setSelectedRating] = useState<number | undefined>(
    rating,
  );

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    if (onRatingSelect && selectedRating !== undefined) {
      onRatingSelect(selectedRating);
    }
  };

  return (
    <section className="flex flex-col items-center">
      {onRatingSelect ? (
        <StarInput onRatingSelect={handleRatingSelect} />
      ) : (
        <StarDisplay rating={rating} />
      )}
      {onRatingSelect && (
        <Button
          type="button"
          className="mt-10 h-10 px-6"
          onClick={handleSubmit}
        >
          Submit review
        </Button>
      )}
    </section>
  );
};

StarRating.displayName = 'StarRating';
export default StarRating;
