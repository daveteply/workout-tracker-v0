'use server';

import { WorkoutSessionDTO } from '@repo/dto/workout-session';
import { API_TRACKING_URL, HEADER_JSON, HTTP_STATUS_CREATED } from '../constants';
import { revalidatePath } from 'next/cache';

export async function createNewSession(memberSlug: string | undefined) {
  const body: WorkoutSessionDTO = {
    memberSlug: memberSlug,
  };

  const createWorkoutSessionResponse = await fetch(
    new URL('/v1/workout-session', API_TRACKING_URL),
    {
      headers: HEADER_JSON,
      method: 'POST',
      body: JSON.stringify(body),
    },
  );

  if (createWorkoutSessionResponse.status === HTTP_STATUS_CREATED) {
    revalidatePath('/tracking');
  } else {
    // TODO: other error handling
    console.error(createWorkoutSessionResponse);
  }
}
