'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createActivity(
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

  const response = await fetch('http://localhost:8080/activity', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteActivity() {}
