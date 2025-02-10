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
      <h3>
        Workout Category - <span className="capitalize italic">{activityCategory?.title}</span>
      </h3>
      <h4>Select an Activity:</h4>
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
