import StarInput from '@/components/StarRating/StarInput';
import StarDisplay from '@/components/StarRating/StarDisplay';

interface StarRatingProps {
  rating: number;
  onRatingSelect?: (rating: number) => void;
}

const StarRating = ({ rating, onRatingSelect }: StarRatingProps) => {
  return (
    <section className="flex flex-col items-center">
      {onRatingSelect ? (
        <StarInput onRatingSelect={onRatingSelect} />
      ) : (
        <StarDisplay rating={rating} />
      )}
      {onRatingSelect && (
        <input
          type="submit"
          className="mt-10 h-10 px-6 font-semibold rounded-md bg-black text-white"
          value="Submit review"
        />
      )}
    </section>
  );
};

StarRating.displayName = 'StarRating';
export default StarRating;
