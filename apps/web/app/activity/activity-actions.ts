'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { API_STRUCTURE_URL, HTTP_STATUS_CREATED, HTTP_STATUS_OK } from '../constants';

export async function createActivity(prevState: { message: string }, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    categorySlug: z.string(),
  });

  const parse = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    categorySlug: formData.get('category-slug'),
  });

  if (!parse.success) {
    return { message: 'Failed to create Activity' };
  }

  const data = parse.data;

  const response = await fetch(`${API_STRUCTURE_URL}/v1/activities`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_CREATED) {
    // TODO: toast
    console.info(`Created new Activity: ${data.title}`);
    revalidatePath('/');
  } else {
    return {
      message: `Failed to create Activity: ${response.statusText}`,
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
    activitySlug: formData.get('category-slug'),
  });

  if (!parse.success) {
    return { message: 'Failed to update Activity' };
  }

  const data = parse.data;

  const response = await fetch(`${API_STRUCTURE_URL}/v1/activities/${data.activitySlug}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_OK) {
    // TODO: toast
    console.info(`Updated Activity: ${data.title}`);
    revalidatePath('/');
  } else {
    return {
      message: `Failed to update Activity: ${response.statusText}`,
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
    return { message: 'Failed to delete Activity' };
  }

  const response = await fetch(`${API_STRUCTURE_URL}/v1/activities/${parse.data.slug}`, {
    method: 'DELETE',
  });

  if (response.status === HTTP_STATUS_OK) {
    revalidatePath('/');
    // nothing to return
  } else {
    return {
      message: 'Failed to delete Activity: ' + response.statusText,
    };
  }
}
