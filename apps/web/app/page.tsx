import { StartSessionComponent } from '@repo/ui/start-session';
import { createNewSession } from './workout-session/components/session-actions';
import { API_TRACKING_URL } from './constants';

export default async function Home() {
  const workoutSessionResponse = await fetch(`${API_TRACKING_URL}/v1/workout-session`);
  const workoutSessions = await workoutSessionResponse.json();

  return (
    <section>
      <h3>Welcome to Workout Tracker</h3>
      <p>This is an app to help you track your workouts and track progress towards goals!</p>
      <StartSessionComponent startSessionAction={createNewSession} />
      {workoutSessions.map((w: any) => (
        <div key={w._id}>
          |{w.SessionStart}|{w.Id}|
        </div>
      ))}
    </section>
  );
}
