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
      className={`text-3xl ${hasHandlers ? 'cursor-pointer' : ''} ${marked ? 'marked' : ''}`}
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
