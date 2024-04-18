import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

const Star = ({ selected = false, rating, onSelect, onHover }) => {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;

  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  );
};

export default function Rating({
  value = 0,
  onSelect,
  onHover,
  onMouseOut,
  className,
}) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          selected={value >= rating}
          key={rating}
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}
