'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { HTTP_STATUS_CREATED } from '../constants';

export async function createActivity(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    title: z.string().min(1),
    activityCategorySlug: z.string(),
  });

  const parse = schema.safeParse({
    title: formData.get('title'),
    activityCategorySlug: formData.get('activity-category-slug'),
  });

  if (!parse.success) {
    return { message: 'Failed to create' };
  }

  const data = parse.data;

  const response = await fetch('http://localhost:8080/activity', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_CREATED) {
    revalidatePath('/');
    // nothing to return
  } else {
    return {
      message: 'Failed to delete activity category: ' + response.statusText,
    };
  }
}

export async function deleteActivity() {}
