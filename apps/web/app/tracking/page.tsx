import Link from 'next/link';
import { cookies } from 'next/headers';

import { CreateSessionComponent } from './components/start-session';
import { createNewSession } from './session-actions';
import { WorkoutSessionDTO } from '@repo/dto/workout-session';
import { getSessionCount, getSessions } from '../../utils/data-fetch';
import { MEMBER_COOKIE_KEY } from '../constants';
import { DateTime } from '../components/date-time';
import { PageLinks } from './components/page-links';

export default async function TrackingPage({
  searchParams,
}: {
  searchParams: Promise<{ pn: string }>;
}) {
  const cookieStore = await cookies();
  const memberSlug = cookieStore.get(MEMBER_COOKIE_KEY)?.value;

  const pnValue = (await searchParams).pn || '1';
  const pageNumber = parseInt(pnValue);

  const [workoutSessions, count] = await Promise.all([
    getSessions(memberSlug, 10, pageNumber),
    getSessionCount(memberSlug),
  ]);

  return (
    <section>
      <h3>Workout Sessions</h3>
      <div className="mb-5">
        <CreateSessionComponent createSessionAction={createNewSession} memberSlug={memberSlug} />
      </div>

      <PageLinks count={count} currentPage={pageNumber} />

      <div className="overflow-x-auto">
        {workoutSessions.length !== 0 && (
          <table>
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
                        className="btn btn-secondary text-primary-content capitalize mr-3 no-underline"
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

      <div className="mb-5">
        <PageLinks count={count} currentPage={pageNumber} />
      </div>
    </section>
  );
}
