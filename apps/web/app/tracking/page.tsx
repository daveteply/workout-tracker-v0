import { StartSessionComponent } from '@repo/ui/start-session';
import { ContinueWorkoutSession } from '@repo/ui/continue-session';
import { API_TRACKING_URL } from '../constants';
import { createNewSession } from './components/session-actions';

export default async function Home() {
  const workoutSessionResponse = await fetch(`${API_TRACKING_URL}/v1/workout-session`);
  const workoutSessions = await workoutSessionResponse.json();

  return (
    <section>
      <h3>Workout Sessions</h3>
      <div className="mb-5">
        <StartSessionComponent startSessionAction={createNewSession} />
      </div>
      <ContinueWorkoutSession workoutSessions={workoutSessions} />
    </section>
  );
}
