'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { HTTP_STATUS_CREATED, HTTP_STATUS_OK } from '../constants';

export async function createActivity(prevState: { message: string }, formData: FormData) {
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
    activitySlug: z.string(),
    activityCategorySlug: z.string(),
  });

  const parse = schema.safeParse({
    title: formData.get('title'),
    activitySlug: formData.get('activity-slug'),
    activityCategorySlug: formData.get('activity-category-slug'),
  });

  if (!parse.success) {
    return { message: 'Failed to create' };
  }

  const data = parse.data;

  const response = await fetch(`http://localhost:8080/activity/${data.activitySlug}`, {
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
  const url = `http://localhost:8080/activity/${data.slug}`;

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
