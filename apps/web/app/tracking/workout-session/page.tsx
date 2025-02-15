import Link from 'next/link';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';
import { getCategories, getSessionCategoryHistory } from '../../../utils/data-fetch';
import { cookies } from 'next/headers';
import { MEMBER_COOKIE_KEY, SESSION_HISTORY_LIMIT } from '../../constants';
import { CrumbTrail, CrumbTrailEntry } from '../../components/crumb-trail';

export default async function WorkoutSessionPage({
  searchParams,
}: {
  searchParams: Promise<{ ses: string }>;
}) {
  const cookieStore = await cookies();
  const memberSlug = cookieStore.get(MEMBER_COOKIE_KEY)?.value;

  const sessionId = (await searchParams).ses;
  const [activityCategories, categoryHistory] = await Promise.all([
    getCategories(),
    getSessionCategoryHistory(memberSlug as string, SESSION_HISTORY_LIMIT),
  ]);

  const buttonClasses = (categorySlug: string): string => {
    return `btn no-underline m-3 h-30 w-30 sm:h-35 sm:w-35 ${categoryHistory.find((c) => c.categorySlug === categorySlug) ? 'btn-secondary' : ''}`;
  };

  const crumbEntries: CrumbTrailEntry[] = [
    { label: 'Workout Sessions', pathname: '/tracking' },
    { label: 'Categories' },
  ];

  return (
    <div>
      <CrumbTrail entries={crumbEntries} />

      <h3>What are you working on today?</h3>

      <div className="flex flex-wrap sm:justify-start justify-center">
        {activityCategories.map((c: ActivityCategoryDTO) => (
          <Link
            className={buttonClasses(c.slug as string)}
            key={c.slug}
            href={{
              pathname: './workout-session/activity/',
              query: { cs: c.slug, ses: sessionId },
            }}
          >
            {c.title}
          </Link>
        ))}
      </div>
      {categoryHistory.length ? (
        <span className="text-xs">Recently Used Categories are highlighted</span>
      ) : (
        <span className="text-xs">Select a Category above</span>
      )}
    </div>
  );
}
