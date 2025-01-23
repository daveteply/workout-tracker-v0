import Link from 'next/link';
import { StartSessionComponent } from '@repo/ui/start-session';
import { API_TRACKING_URL } from '../constants';
import { createNewSession } from './session-actions';
import { WorkoutSessionDTO } from '@repo/dto/workout-session';

export default async function TrackingPage() {
  const workoutSessionResponse = await fetch(`${API_TRACKING_URL}/v1/workout-session`);
  const workoutSessions = await workoutSessionResponse.json();

  return (
    <section>
      <h3>Workout Sessions</h3>
      <div className="mb-5">
        <StartSessionComponent startSessionAction={createNewSession} />
      </div>
      {workoutSessions.map((s: WorkoutSessionDTO, index: number) => (
        <div key={index} className="mb-3">
          <Link
            className="btn text-xs sm:text-sm capitalize mr-3"
            href={{ pathname: '/tracking/workout-session', query: { ses: s.id } }}
          >
            continue workout
          </Link>
          {s.sessionStart?.toString()} | {s.activitySetsCount}
        </div>
      ))}
    </section>
  );
}
