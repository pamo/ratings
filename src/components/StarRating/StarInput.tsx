import { useEffect, useState } from 'react';
import { positionsDefault } from '@/utils/constants';
import Star from '@/components/StarRating/Star';

interface StarInputProps {
  onRatingSelect: (rating: number) => void;
  positions?: number[];
  preselectedRating?: number;
}

const StarInput = ({
  onRatingSelect,
  positions = positionsDefault,
  preselectedRating = 0,
}: StarInputProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(preselectedRating);

  useEffect(() => {
    setSelectedRating(preselectedRating);
  }, [preselectedRating]);

  const handleMouseEnter = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingSelect(rating);
  };

  return (
    <div className="flex">
      {positions.map(starPosition => (
        <Star
          key={starPosition}
          position={starPosition}
          marked={starPosition <= (hoveredRating || selectedRating)}
          onMouseEnter={() => handleMouseEnter(starPosition)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(starPosition)}
        />
      ))}
    </div>
  );
};

StarInput.displayName = 'StarInput';
export default StarInput;
