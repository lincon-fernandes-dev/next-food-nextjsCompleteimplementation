'use server';

import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';

import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';
import { IMeal } from '@/domain/IMeal';

function isInvalidText(text: string) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState: any, formData: any) {
  const meal: IMeal = {
    id: uuidv4(),
    title: formData.get('title'),
    slug: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image
  ) {
    return {
      message: 'Invalid input.',
    };
  }

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
}