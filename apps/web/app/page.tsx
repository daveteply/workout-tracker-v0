import { StartSessionComponent } from '@repo/ui/start-session';
import { createNewSession } from './workout/components/session-actions';

export default function Home() {
  return (
    <section>
      <h3>Welcome to Workout Tracker</h3>
      <p>This is an app to help you track your workouts and track progress towards goals!</p>
      <StartSessionComponent startSessionAction={createNewSession} />
    </section>
  );
}
