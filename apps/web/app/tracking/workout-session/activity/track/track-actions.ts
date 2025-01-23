'use server';

import { redirect } from 'next/navigation';
import { API_TRACKING_URL, HTTP_STATUS_CREATED } from '../../../../constants';
import { ActivitySetDTO } from '@repo/dto/activity-set';

export async function updateWorkoutSession(sessionId: string, activitySet: ActivitySetDTO) {
  const patchData = {
    sessionId: sessionId,
    activitySet: activitySet,
  };

  // add Set to existing Session
  const result = await fetch(`${API_TRACKING_URL}/v1/workout-set/`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(patchData),
  });

  if (result.status === HTTP_STATUS_CREATED) {
    // TODO: review strategy here
    redirect(`/tracking/workout-session?ses=${sessionId}`);
  }

  return result.status;
}
