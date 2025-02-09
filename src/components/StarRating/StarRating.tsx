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
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = async () => {
    if (onRatingSelect && selectedRating !== undefined) {
      setIsSaving(true);
      setError(null);
      try {
        await onRatingSelect(selectedRating);
        setSelectedRating(undefined);
      } catch (err) {
        setError('Failed to save rating. Please try again.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <section className="flex flex-col items-center">
      {onRatingSelect ? (
        <StarInput
          onRatingSelect={handleRatingSelect}
          preselectedRating={selectedRating}
        />
      ) : (
        <StarDisplay rating={rating} />
      )}
      {onRatingSelect && (
        <>
          <Button
            type="button"
            className="primary mt-10 h-10 px-6"
            onClick={handleSubmit}
            disabled={isSaving || !selectedRating}
          >
            {isSaving ? 'Saving...' : 'Submit review'}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </section>
  );
};

StarRating.displayName = 'StarRating';
export default StarRating;
