'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { HTTP_STATUS_CREATED, HTTP_STATUS_OK } from '../../constants';

export async function createActivityAttribute(prevState: { message: string }, formData: FormData) {
  const schema = z.object({
    attributeTitle: z.string().min(1),
    attributeDescription: z.string().optional(),
    attributeType: z.string(),
  });

  const parse = schema.safeParse({
    attributeTitle: formData.get('attribute-title'),
    attributeDescription: formData.get('attribute-description'),
    attributeType: formData.get('attribute-type'),
  });

  if (!parse.success) {
    return { message: 'Failed to create' };
  }

  const data = parse.data;

  const response = await fetch('http://localhost:8080/v1/activity-attribute', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_CREATED) {
    revalidatePath('/');
    // nothing to return
  } else {
    return {
      message: 'Failed to add activity Attribute: ' + response.statusText,
    };
  }
}

export async function updateActivityAttribute(prevState: { message: string }, formData: FormData) {
  const schema = z.object({
    slug: z.string().min(1),
    attributeTitle: z.string().min(1),
    attributeDescription: z.string().optional(),
    attributeType: z.string(),
  });

  const parse = schema.safeParse({
    slug: formData.get('slug'),
    attributeTitle: formData.get('attribute-title'),
    attributeDescription: formData.get('attribute-description'),
    attributeType: formData.get('attribute-type'),
  });

  if (!parse.success) {
    return { message: 'Failed to update' };
  }

  const data = parse.data;

  const response = await fetch('http://localhost:8080/v1/activity-attribute/', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_OK) {
    revalidatePath('/');
    // nothing to return
  } else {
    return {
      message: 'Failed to delete activity attribute: ' + response.statusText,
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
    return { message: 'Failed to delete' };
  }

  const data = parse.data;
  const url = `http://localhost:8080/v1/activity-attribute/${data.slug}`;

  const response = await fetch(url, { method: 'DELETE' });

  if (response.status === HTTP_STATUS_OK) {
    revalidatePath('/');
    // nothing to return
  } else {
    return {
      message: 'Failed to delete activity Attribute: ' + response.statusText,
    };
  }
}
