import Link from 'next/link';
import { StartSessionComponent } from '@repo/ui/start-session';
import { API_TRACKING_URL } from '../constants';
import { createNewSession } from './components/session-actions';
import { WorkoutSessionDTO } from '@repo/dto/workout-session';

export default async function Home() {
  const workoutSessionResponse = await fetch(`${API_TRACKING_URL}/v1/workout-session`);
  const workoutSessions = await workoutSessionResponse.json();

  return (
    <section>
      <h3>Workout Sessions</h3>
      <div className="mb-5">
        <StartSessionComponent startSessionAction={createNewSession} />
      </div>
      {workoutSessions.map((s: WorkoutSessionDTO) => (
        <div key={s.Id} className="mb-3">
          <Link
            className="btn text-xs sm:text-sm capitalize mr-3"
            href={{ pathname: '/tracking/workout-session', query: { ses: s.Id } }}
          >
            continue workout
          </Link>
          {s.SessionStart.toString()}
        </div>
      ))}
    </section>
  );
}
