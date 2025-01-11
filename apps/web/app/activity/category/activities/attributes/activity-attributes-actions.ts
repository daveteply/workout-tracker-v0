'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { HTTP_STATUS_CREATED, HTTP_STATUS_OK } from '../../../../constants';

export async function attachActivityAttributes(prevState: { message: string }, formData: FormData) {
  const schema = z.object({
    activitySlug: z.string(),
    attributeSlug: z.string(),
  });

  const parse = schema.safeParse({
    activitySlug: formData.get('activity-slug'),
    attributeSlug: formData.get('attribute-slug'),
  });

  if (!parse.success) {
    return { message: 'Failed to create' };
  }

  const data = parse.data;

  const response = await fetch('http://localhost:8080/v1/activity-attributes', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.status === HTTP_STATUS_CREATED) {
    // TODO: toast
    console.info('Created new activity attributes');
    revalidatePath('/');
  } else {
    return {
      message: `Failed to create activity attributes: ${response.statusText}`,
    };
  }
}

export async function removeActivityAttributes(prevState: { message: string }, formData: FormData) {
  const schema = z.object({
    activitySlug: z.string().min(1),
    attributeSlug: z.string().min(1),
  });

  const parse = schema.safeParse({
    activitySlug: formData.get('activity-slug'),
    attributeSlug: formData.get('attribute-slug'),
  });

  if (!parse.success) {
    return { message: 'Failed to delete' };
  }

  const data = parse.data;
  const url = `http://localhost:8080/v1/activity-attributes?as=${data.activitySlug}&at=${data.attributeSlug}`;

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
