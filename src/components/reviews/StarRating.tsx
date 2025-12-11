'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  isInteractive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  totalStars = 5,
  size = 20,
  className,
  isInteractive = false,
  onRatingChange,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    if (isInteractive) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (isInteractive) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (isInteractive && onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[...Array(totalStars)].map((_, i) => {
        const starIndex = i + 1;
        const currentRating = hoverRating || rating;
        
        return (
          <Star
            key={starIndex}
            size={size}
            className={cn(
              'transition-colors',
              isInteractive ? 'cursor-pointer' : '',
              starIndex <= currentRating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            )}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
          />
        );
      })}
    </div>
  );
}
