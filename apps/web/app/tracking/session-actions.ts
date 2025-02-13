'use server';

import { WorkoutSessionDTO } from '@repo/dto/workout-session';
import { API_TRACKING_URL, HTTP_STATUS_CREATED } from '../constants';
import { revalidatePath } from 'next/cache';

export async function createNewSession(memberSlug: string | undefined) {
  const body: WorkoutSessionDTO = {
    memberSlug: memberSlug,
  };

  const createWorkoutSessionResponse = await fetch(`${API_TRACKING_URL}/v1/workout-session`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (createWorkoutSessionResponse.status === HTTP_STATUS_CREATED) {
    revalidatePath('/tracking');
  } else {
    // TODO: other error handling
    console.error(createWorkoutSessionResponse);
  }
}
