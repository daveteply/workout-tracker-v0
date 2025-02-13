import Link from 'next/link';
import { ActivityDTO } from '@repo/dto/activity';
import {
  getCategory,
  getCategoryActivities,
  getSessionActivityHistory,
} from '../../../../utils/data-fetch';
import { cookies } from 'next/headers';
import { MEMBER_COOKIE_KEY, SESSION_HISTORY_LIMIT } from '../../../constants';

export default async function WorkoutActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ cs: string; ses: string }>;
}) {
  const params = await searchParams;
  const activityCategorySlug = params.cs;
  const sessionId = params.ses;

  const cookieStore = await cookies();
  const memberSlug = cookieStore.get(MEMBER_COOKIE_KEY)?.value;

  const [activityCategory, activities, activityHistory] = await Promise.all([
    getCategory(activityCategorySlug),
    getCategoryActivities(activityCategorySlug),
    getSessionActivityHistory(memberSlug as string, SESSION_HISTORY_LIMIT),
  ]);

  const buttonClasses = (activitySlug: string): string => {
    return `btn no-underline m-3 h-30 w-30 sm:h-35 sm:w-35 ${activityHistory.find((a) => a.activitySlug === activitySlug) ? 'btn-secondary' : ''}`;
  };

  return (
    <div>
      <div className="text-xs">
        <Link className="no-underline hover:underline" href={'/tracking/'}>
          Workout Sessions
        </Link>
        &nbsp;&gt;&nbsp;
        <Link
          className="no-underline hover:underline"
          href={{ pathname: '/tracking/workout-session/', query: { ses: sessionId } }}
        >
          Categories
        </Link>
        &nbsp;&gt;&nbsp;
        <span>Activities</span>
      </div>
      <h3>
        Which <span className="capitalize">{activityCategory?.title}</span> activity is next for
        you?
      </h3>
      <div className="flex flex-wrap sm:justify-start justify-center">
        {activities.map((a: ActivityDTO) => (
          <Link
            className={buttonClasses(a.slug as string)}
            href={{
              pathname: './activity/track',
              query: { s: a.slug, cs: activityCategorySlug, secs: sessionId },
            }}
            key={a.slug}
          >
            {a.title}
          </Link>
        ))}
      </div>
      <span className="text-xs">Recently Used Activities are highlighted</span>
    </div>
  );
}
