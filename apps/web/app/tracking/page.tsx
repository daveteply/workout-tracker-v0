import Link from 'next/link';
import { CreateSessionComponent } from './components/start-session';
import { API_TRACKING_URL } from '../constants';
import { createNewSession } from './session-actions';
import { WorkoutSessionDTO } from '@repo/dto/workout-session';

export default async function TrackingPage() {
  const workoutSessionResponse = await fetch(`${API_TRACKING_URL}/v1/workout-session`);
  const workoutSessions = await workoutSessionResponse.json();

  const locale = 'en-US'; // TODO: replace with i18n
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedSessionStart = (sessionStart: Date): string => {
    const start = new Date(sessionStart);
    return `${dateFormatter.format(start)} ${timeFormatter.format(start)}`;
  };

  return (
    <section>
      <h3>Workout Sessions</h3>
      <div className="mb-5">
        <CreateSessionComponent createSessionAction={createNewSession} />
      </div>
      <div className="overflow-x-auto">
        {workoutSessions.length !== 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Session Started</th>
                <th>Sets</th>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {workoutSessions.map((session: WorkoutSessionDTO) => (
                <tr key={session.id}>
                  <td>{session.sessionStart && formattedSessionStart(session.sessionStart)}</td>
                  <td>{session.activitySetsCount}</td>
                  <td>
                    <Link
                      className="btn btn-secondary text-xs sm:text-sm capitalize mr-3 no-underline"
                      href={{ pathname: '/tracking/workout-session', query: { ses: session.id } }}
                    >
                      continue workout
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
