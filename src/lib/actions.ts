'use server';

import { z } from 'zod';
import { addReview } from './data';
import { revalidatePath } from 'next/cache';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const ReviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  text: z.string().min(10, 'Review must be at least 10 characters long.'),
  dispensaryId: z.string(),
  stateId: z.string(),
  cityId: z.string(),
  userId: z.string(),
  userName: z.string(),
});

export type ReviewFormState = {
  errors?: {
    rating?: string[];
    text?: string[];
  };
  message?: string | null;
}

export async function submitReview(prevState: ReviewFormState, formData: FormData) {
  const validatedFields = ReviewSchema.safeParse({
    rating: formData.get('rating'),
    text: formData.get('text'),
    dispensaryId: formData.get('dispensaryId'),
    stateId: formData.get('stateId'),
    cityId: formData.get('cityId'),
    userId: formData.get('userId'),
    userName: formData.get('userName'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to submit review. Please check the fields.',
    };
  }

  try {
    const { dispensaryId, ...reviewData } = validatedFields.data;
    const reviewsCollection = collection(db, 'states', validatedFields.data.stateId, 'cities', validatedFields.data.cityId, 'dispensaries', dispensaryId, 'reviews');
    addDocumentNonBlocking(reviewsCollection, {
      ...reviewData,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to save review.',
    };
  }
  
  const { stateId, cityId, dispensaryId } = validatedFields.data;
  revalidatePath(`/state/${stateId}/city/${cityId}/dispensary/${dispensaryId}`);
  
  return { message: 'Review submitted successfully!' };
}
