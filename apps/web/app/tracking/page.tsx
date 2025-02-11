import Link from 'next/link';
import { cookies } from 'next/headers';

import { CreateSessionComponent } from './components/start-session';
import { createNewSession } from './session-actions';
import { WorkoutSessionDTO } from '@repo/dto/workout-session';
import { getSessionByMember } from '../../utils/data-fetch';
import { MEMBER_COOKIE_KEY } from '../constants';

export default async function TrackingPage() {
  const cookieStore = await cookies();
  const memberSlug = cookieStore.get(MEMBER_COOKIE_KEY)?.value;
  const workoutSessions = await getSessionByMember(memberSlug);

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

  const formatDate = (sessionStart: Date): string => {
    const start = new Date(sessionStart);
    return `${dateFormatter.format(start)} ${timeFormatter.format(start)}`;
  };

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
                  <td>{session.sessionStart && formatDate(session.sessionStart)}</td>
                  <td>{session.sessionCompleted && formatDate(session.sessionCompleted)}</td>
                  <td className="text-center">{session.activitySetsCount}</td>
                  <td>
                    {!session.sessionCompleted && (
                      <Link
                        className="btn btn-secondary text-xs sm:text-sm capitalize mr-3 no-underline"
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
