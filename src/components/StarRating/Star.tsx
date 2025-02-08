interface StarProps {
  position: number;
  marked: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const Star = ({
  position,
  marked,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: StarProps) => {
  const hasHandlers = onMouseEnter || onMouseLeave || onClick;
  const role = hasHandlers ? 'button' : 'img';
  return (
    <span
      data-star-id={position}
      role={role}
      className={`text-3xl ${hasHandlers ? 'cursor-pointer transition-colors duration-150 ease-linear hover:text-primary-purple' : ''} ${marked ? 'marked text-primary-purple' : 'text-gray-400'}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {marked ? '\u2605' : '\u2606'}
    </span>
  );
};

Star.displayName = 'Star';
export default Star;
