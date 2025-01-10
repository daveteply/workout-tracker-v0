'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { HTTP_STATUS_CREATED, HTTP_STATUS_OK } from '../constants';

export async function createActivity(prevState: { message: string }, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    activityCategorySlug: z.string(),
  });

  const parse = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    activityCategorySlug: formData.get('activity-category-slug'),
  });

  if (!parse.success) {
    return { message: 'Failed to create' };
  }

  const data = parse.data;

  const response = await fetch('http://localhost:8080/v1/activities', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_CREATED) {
    // TODO: toast
    console.info(`Created new activity category: ${data.title}`);
    revalidatePath('/');
  } else {
    return {
      message: `Failed to delete activity category: ${response.statusText}`,
    };
  }
}

export async function updateActivity(prevState: { message: string }, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    activitySlug: z.string(),
  });

  const parse = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    activitySlug: formData.get('activity-slug'),
  });

  if (!parse.success) {
    return { message: 'Failed to update' };
  }

  const data = parse.data;

  const response = await fetch(`http://localhost:8080/v1/activities/${data.activitySlug}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_OK) {
    // TODO: toast
    console.info(`Created new activity: ${data.title}`);
    revalidatePath('/');
  } else {
    return {
      message: `Failed to delete activity: ${response.statusText}`,
    };
  }
}

export async function deleteActivity(prevState: { message: string }, formData: FormData) {
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
  const url = `http://localhost:8080/v1/activities/${data.slug}`;

  const response = await fetch(url, { method: 'DELETE' });

  if (response.status === HTTP_STATUS_OK) {
    revalidatePath('/');
    // nothing to return
  } else {
    return {
      message: 'Failed to delete activity category: ' + response.statusText,
    };
  }
}
