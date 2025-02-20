'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  API_STRUCTURE_URL,
  HEADER_JSON,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  ServerActionResponse,
} from '../../constants';

export async function createActivityCategory(formData: FormData): Promise<ServerActionResponse> {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
  });

  const parse = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!parse.success) {
    return { success: false, message: 'Failed to create Activity Category' };
  }

  const data = parse.data;

  const response = await fetch(new URL('/v1/categories', API_STRUCTURE_URL), {
    headers: HEADER_JSON,
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_CREATED) {
    revalidatePath('/');
    return { success: true };
  } else {
    return {
      success: false,
      message: 'Failed to create Activity Category: ' + response.statusText,
    };
  }
}

export async function updateActivityCategory(formData: FormData): Promise<ServerActionResponse> {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    slug: z.string(),
  });

  const parse = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    slug: formData.get('slug'),
  });

  if (!parse.success) {
    return { success: false, message: 'Failed to update Activity Category' };
  }

  const data = parse.data;

  const response = await fetch(new URL('/v1/categories', API_STRUCTURE_URL), {
    headers: HEADER_JSON,
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_OK) {
    revalidatePath('/');
    return { success: true };
  } else {
    return {
      success: false,
      message: 'Failed to update Activity Category: ' + response.statusText,
    };
  }
}

export async function deleteActivityCategory(formData: FormData): Promise<ServerActionResponse> {
  const schema = z.object({
    slug: z.string().min(1),
  });

  const parse = schema.safeParse({
    slug: formData.get('slug'),
  });

  if (!parse.success) {
    return { success: false, message: 'Failed to delete Activity Category' };
  }

  const data = parse.data;

  const response = await fetch(new URL(`/v1/categories/${data.slug}`, API_STRUCTURE_URL), {
    method: 'DELETE',
  });

  if (response.status === HTTP_STATUS_OK) {
    revalidatePath('/');
    return { success: true };
  } else {
    return {
      success: false,
      message: 'Failed to delete Activity Category: ' + response.statusText,
    };
  }
}
