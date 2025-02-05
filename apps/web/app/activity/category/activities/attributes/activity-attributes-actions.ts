'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  API_STRUCTURE_URL,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  ServerActionResponse,
} from '../../../../constants';

export async function attachActivityAttributes(formData: FormData): Promise<ServerActionResponse> {
  const schema = z.object({
    activitySlug: z.string(),
    attributeSlug: z.string(),
  });

  const parse = schema.safeParse({
    activitySlug: formData.get('activity-slug'),
    attributeSlug: formData.get('attribute-slug'),
  });

  if (!parse.success) {
    return { success: false, message: 'Failed to create Activity Attributes' };
  }

  const data = parse.data;

  const response = await fetch(`${API_STRUCTURE_URL}/v1/activity-attributes`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_CREATED) {
    revalidatePath('/');
    return { success: true };
  } else {
    return {
      success: false,
      message: `Failed to create Activity Attributes: ${response.statusText}`,
    };
  }
}

export async function removeActivityAttributes(formData: FormData): Promise<ServerActionResponse> {
  const schema = z.object({
    activitySlug: z.string().min(1),
    attributeSlug: z.string().min(1),
  });

  const parse = schema.safeParse({
    activitySlug: formData.get('activity-slug'),
    attributeSlug: formData.get('attribute-slug'),
  });

  if (!parse.success) {
    return { success: false, message: 'Failed to delete Activity Attributes' };
  }

  const data = parse.data;
  const url = `${API_STRUCTURE_URL}/v1/activity-attributes?as=${data.activitySlug}&at=${data.attributeSlug}`;

  const response = await fetch(url, { method: 'DELETE' });

  if (response.status === HTTP_STATUS_OK) {
    revalidatePath('/');
    return { success: true };
  } else {
    return {
      success: false,
      message: 'Failed to delete Activity Attributes: ' + response.statusText,
    };
  }
}
