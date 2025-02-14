'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  API_STRUCTURE_URL,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  ServerActionResponse,
} from '../../constants';

const parseFormData = (
  formData: FormData,
  schema: z.ZodObject<any>,
): { success: boolean; data?: any; message?: string } => {
  const parse = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    slug: formData.get('slug'),
  });

  if (!parse.success) {
    return { success: false, message: 'Validation failed' };
  }

  return { success: true, data: parse.data };
};

const fetchRequest = async (url: string, method: string, data?: any): Promise<Response> => {
  const options: RequestInit = {
    headers: { 'Content-Type': 'application/json' },
    method,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options);
};

export async function createActivityCategory(formData: FormData): Promise<ServerActionResponse> {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
  });

  const { success, data, message } = parseFormData(formData, schema);

  if (!success) {
    return { success: false, message: 'Failed to create Activity Category' };
  }

  const response = await fetchRequest(`${API_STRUCTURE_URL}/v1/categories`, 'POST', data);

  if (response.status === HTTP_STATUS_CREATED) {
    revalidatePath('/');
    return { success: true };
  } else {
    return {
      success: false,
      message: `Failed to create Activity Category: ${response.statusText}`,
    };
  }
}

export async function updateActivityCategory(formData: FormData): Promise<ServerActionResponse> {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    slug: z.string(),
  });

  const { success, data, message } = parseFormData(formData, schema);

  if (!success) {
    return { success: false, message: 'Failed to update Activity Category' };
  }

  const response = await fetchRequest(`${API_STRUCTURE_URL}/v1/categories`, 'PATCH', data);

  if (response.status === HTTP_STATUS_OK) {
    revalidatePath('/');
    return { success: true };
  } else {
    return {
      success: false,
      message: `Failed to update Activity Category: ${response.statusText}`,
    };
  }
}

export async function deleteActivityCategory(formData: FormData): Promise<ServerActionResponse> {
  const schema = z.object({
    slug: z.string().min(1),
  });

  const { success, data, message } = parseFormData(formData, schema);

  if (!success) {
    return { success: false, message: 'Failed to delete Activity Category' };
  }

  const url = `${API_STRUCTURE_URL}/v1/categories/${data.slug}`;
  const response = await fetchRequest(url, 'DELETE');

  if (response.status === HTTP_STATUS_OK) {
    revalidatePath('/');
    return { success: true };
  } else {
    return {
      success: false,
      message: `Failed to delete Activity Category: ${response.statusText}`,
    };
  }
}
