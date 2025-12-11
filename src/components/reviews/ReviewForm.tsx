'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useAuth as useAppAuth } from '@/hooks/useAuth';
import { submitReview } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from './StarRating';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Label } from '../ui/label';

const ReviewFormSchema = z.object({
  rating: z.number().min(1, 'Please select a rating.'),
  text: z.string().min(10, 'Review must be at least 10 characters long.'),
});

type ReviewFormData = z.infer<typeof ReviewFormSchema>;

interface ReviewFormProps {
  dispensaryId: string;
  stateId: string;
  cityId: string;
}

export function ReviewForm({ dispensaryId, stateId, cityId }: ReviewFormProps) {
  const { user } = useAppAuth();
  const { toast } = useToast();
  const [initialState, setInitialState] = useState({ message: null, errors: {} });

  const [formState, dispatch] = useFormState(submitReview, initialState);
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<ReviewFormData>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      rating: 0,
      text: '',
    },
  });

  const ratingValue = watch('rating');

  useEffect(() => {
    register('rating');
  }, [register]);
  
  useEffect(() => {
    if (formState.message && !formState.errors) {
      toast({
        title: "Success!",
        description: formState.message,
      });
      reset();
    } else if (formState.message && formState.errors) {
       toast({
        variant: "destructive",
        title: "Error",
        description: formState.message,
      });
    }
  }, [formState, toast, reset]);

  if (!user) {
    return (
      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          <Link href="/login" className="text-primary underline hover:text-accent">Log in</Link> to leave a review.
        </p>
      </div>
    );
  }

  const onSubmit = (data: ReviewFormData) => {
    const formData = new FormData();
    formData.append('rating', String(data.rating));
    formData.append('text', data.text);
    formData.append('dispensaryId', dispensaryId);
    formData.append('stateId', stateId);
    formData.append('cityId', cityId);
    formData.append('userId', user.uid);
    formData.append('userName', user.displayName || 'Anonymous');
    dispatch(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card p-4 rounded-xl shadow-md mt-4 space-y-4">
      <h3 className="text-lg font-semibold">Write a Review</h3>
      <div>
        <Label className="block mb-2">Rating</Label>
        <StarRating
          rating={ratingValue}
          onRatingChange={(newRating) => setValue('rating', newRating, { shouldValidate: true })}
          isInteractive={true}
          size={24}
        />
        {errors.rating && <p className="mt-2 text-sm text-destructive">{errors.rating.message}</p>}
      </div>
      <div>
        <Label className="block mb-2">Comment</Label>
        <Textarea
          {...register('text')}
          placeholder="Share your thoughts..."
        />
        {errors.text && <p className="mt-2 text-sm text-destructive">{errors.text.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}
