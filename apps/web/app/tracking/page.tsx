import Link from 'next/link';
import { cookies } from 'next/headers';

import { CreateSessionComponent } from './components/start-session';
import { createNewSession } from './session-actions';
import { WorkoutSessionDTO } from '@repo/dto/workout-session';
import { getSessions } from '../../utils/data-fetch';
import { MEMBER_COOKIE_KEY } from '../constants';
import { DateTime } from '../components/date-time';

export default async function TrackingPage() {
  const cookieStore = await cookies();
  const memberSlug = cookieStore.get(MEMBER_COOKIE_KEY)?.value;
  const workoutSessions = await getSessions(memberSlug);

  return (
    <section>
      <h3>Workout Sessions</h3>
      <div className="mb-5">
        <CreateSessionComponent createSessionAction={createNewSession} memberSlug={memberSlug} />
      </div>
      <div className="overflow-x-auto">
        {workoutSessions.length !== 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Started</th>
                <th>Completed</th>
                <th className="text-center">Sets</th>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {workoutSessions.map((session: WorkoutSessionDTO) => (
                <tr key={session.id}>
                  <td>{session.sessionStart && <DateTime date={session.sessionStart} />}</td>
                  <td>
                    {session.sessionCompleted && <DateTime date={session.sessionCompleted} />}
                  </td>
                  <td className="text-center">{session.activitySetsCount}</td>
                  <td>
                    {!session.sessionCompleted && (
                      <Link
                        className="btn btn-secondary capitalize mr-3 no-underline"
                        href={{ pathname: '/tracking/workout-session', query: { ses: session.id } }}
                      >
                        continue workout
                      </Link>
                    )}
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
