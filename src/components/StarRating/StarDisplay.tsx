import Star from '@/components/StarRating/Star';
import { positionsDefault } from '@/utils/constants';

interface StarDisplayProps {
  rating: number;
  positions?: number[];
}

const StarDisplay = ({
  rating,
  positions = positionsDefault,
}: StarDisplayProps) => {
  return (
    <div className="flex">
      {positions.map(starId => (
        <Star key={starId} position={starId} marked={starId <= rating} />
      ))}
    </div>
  );
};

StarDisplay.displayName = 'StarDisplay';
export default StarDisplay;
