'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  API_STRUCTURE_URL,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  ServerActionResponse,
} from '../constants';

export async function createActivity(formData: FormData): Promise<ServerActionResponse> {
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
    return { success: false, message: 'Failed to create Activity' };
  }

  const data = parse.data;

  const response = await fetch(`${API_STRUCTURE_URL}/v1/activities`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_CREATED) {
    //console.info(`Created new Activity: ${data.title}`);
    revalidatePath('/');
    return { success: true };
  } else {
    return {
      success: false,
      message: `Failed to create Activity: ${response.statusText}`,
    };
  }
}

export async function updateActivity(formData: FormData): Promise<ServerActionResponse> {
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
    return { success: false, message: 'Failed to update Activity' };
  }

  const data = parse.data;

  const response = await fetch(`${API_STRUCTURE_URL}/v1/activities/${data.activitySlug}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_OK) {
    // TODO: toast
    // console.info(`Updated Activity: ${data.title}`);
    revalidatePath('/');
    return { success: true };
  } else {
    return {
      success: false,
      message: `Failed to update Activity: ${response.statusText}`,
    };
  }
}

export async function deleteActivity(formData: FormData): Promise<ServerActionResponse> {
  const schema = z.object({
    slug: z.string().min(1),
  });

  const parse = schema.safeParse({
    slug: formData.get('slug'),
  });

  if (!parse.success) {
    return { success: false, message: 'Failed to delete Activity' };
  }

  const response = await fetch(`${API_STRUCTURE_URL}/v1/activities/${parse.data.slug}`, {
    method: 'DELETE',
  });

  if (response.status === HTTP_STATUS_OK) {
    revalidatePath('/');
    return { success: true };
  } else {
    return {
      success: false,
      message: 'Failed to delete Activity: ' + response.statusText,
    };
  }
}
