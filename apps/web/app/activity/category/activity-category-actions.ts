'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createActivityCategory(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    title: z.string().min(1),
  });

  const parse = schema.safeParse({
    title: formData.get('title'),
  });

  if (!parse.success) {
    return { message: 'Failed to create' };
  }

  const data = parse.data;

  const response = await fetch('http://localhost:8080/activity-category', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.status === 201) {
    revalidatePath('/');
    return {
      message: 'Added new activity category',
    };
  } else {
    return {
      message: 'Failed to add activity category: ' + response.statusText,
    };
  }
}

export async function deleteActivityCategory(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    slug: z.string().min(1),
  });

  const parse = schema.safeParse({
    slug: formData.get('slug'),
  });

  if (!parse.success) {
    return { message: 'Failed to delete', success: false };
  }

  const data = parse.data;
  const url = `http://localhost:8080/activity-category/${data.slug}`;

  const response = await fetch(url, { method: 'DELETE' });

  if (response.status === 200) {
    revalidatePath('/');
    // nothing to return
  } else {
    return {
      message: 'Failed to delete activity category: ' + response.statusText,
    };
  }
}
