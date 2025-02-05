'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { API_STRUCTURE_URL, HTTP_STATUS_CREATED, HTTP_STATUS_OK } from '../../constants';

export async function createActivityAttribute(prevState: { message: string }, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    type: z.string(),
  });

  const parse = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    type: formData.get('attribute-type'),
  });

  if (!parse.success) {
    return { message: 'Failed to create Activity Attribute' };
  }

  const data = parse.data;

  const response = await fetch(`${API_STRUCTURE_URL}/v1/attributes`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_CREATED) {
    revalidatePath('/');
    // nothing to return
  } else {
    return {
      message: 'Failed to create Activity Attribute: ' + response.statusText,
    };
  }
}

export async function updateActivityAttribute(prevState: { message: string }, formData: FormData) {
  const schema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().optional(),
    type: z.string(),
  });

  const parse = schema.safeParse({
    slug: formData.get('slug'),
    title: formData.get('title'),
    description: formData.get('description'),
    type: formData.get('attribute-type'),
  });

  if (!parse.success) {
    return { message: 'Failed to update Activity Attribute' };
  }

  const data = parse.data;

  const response = await fetch(`${API_STRUCTURE_URL}/v1/attributes/`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_OK) {
    revalidatePath('/');
    // nothing to return
  } else {
    return {
      message: 'Failed to update Activity Attribute: ' + response.statusText,
    };
  }
}

export async function deleteActivityAttribute(prevState: { message: string }, formData: FormData) {
  const schema = z.object({
    slug: z.string().min(1),
  });

  const parse = schema.safeParse({
    slug: formData.get('slug'),
  });

  if (!parse.success) {
    return { message: 'Failed to delete Activity Attribute' };
  }

  const data = parse.data;
  const url = `${API_STRUCTURE_URL}/v1/attributes/${data.slug}`;

  const response = await fetch(url, { method: 'DELETE' });

  if (response.status === HTTP_STATUS_OK) {
    revalidatePath('/');
    // nothing to return
  } else {
    return {
      message: 'Failed to delete Activity Attribute: ' + response.statusText,
    };
  }
}
