import React from 'react';
import { Star } from 'lucide-react';

/**
 * VERDORA Design System — Rating Component
 * Renders editorial stars with score and optional review count.
 */
const Rating = ({
  rating = 5,
  maxRating = 5,
  reviewCount,
  size = 'sm', // 'sm' | 'md' | 'lg'
  showScore = true,
  interactive = false,
  onChange,
  className = '',
}) => {
  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size] || 'w-3.5 h-3.5';

  return (
    <div className={`inline-flex items-center gap-1.5 font-sans ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = rating >= starValue;
          const isHalf = !isFilled && rating >= starValue - 0.5;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starValue)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} text-earth`}
              aria-label={`${starValue} of ${maxRating} stars`}
            >
              <Star
                className={`${starSizes} ${
                  isFilled
                    ? 'fill-earth text-earth'
                    : isHalf
                    ? 'fill-earth/50 text-earth'
                    : 'fill-transparent text-charcoal/20'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showScore && (
        <span className="text-xs font-medium text-charcoal/80 ml-0.5">
          {Number(rating).toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-xs text-charcoal/50">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default Rating;

