import Link from 'next/link';
import { ActivityDTO } from '@repo/dto/activity';
import { getCategory, getCategoryActivities } from '../../../../utils/data-fetch';

export default async function WorkoutActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ cs: string; ses: string }>;
}) {
  const params = await searchParams;
  const activityCategorySlug = params.cs;
  const sessionId = params.ses;

  const [activityCategory, activities] = await Promise.all([
    getCategory(activityCategorySlug),
    getCategoryActivities(activityCategorySlug),
  ]);

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
            className="btn btn-secondary no-underline m-3 h-30 w-30 sm:h-35 sm:w-35"
            href={{ pathname: './activity/track', query: { s: a.slug, secs: sessionId } }}
            key={a.slug}
          >
            {a.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
