import type { Review } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="bg-gray-50/50 dark:bg-gray-900/50">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">{review.userName}</span>
          <StarRating rating={review.rating} />
        </div>
        <p className="text-gray-700 dark:text-gray-300">{review.text}</p>
      </CardContent>
    </Card>
  );
}
