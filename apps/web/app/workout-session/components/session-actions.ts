'use server';

import { redirect } from 'next/navigation';
import { API_TRACKING_URL, HTTP_STATUS_CREATED } from '../../constants';

export async function createNewSession() {
  // TODO: un-hard-code after enabling auth
  const body = { memberId: 1 };

  const createWorkoutSessionResponse = await fetch(`${API_TRACKING_URL}/v1/workout-session`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (createWorkoutSessionResponse.status === HTTP_STATUS_CREATED) {
    redirect('/workout-session');
  } else {
    // TODO: other error handling
    console.error(createWorkoutSessionResponse);
  }
}
