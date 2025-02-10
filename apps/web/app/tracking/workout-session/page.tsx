import Link from 'next/link';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';
import { getCategories } from '../../../utils/data-fetch';

export default async function WorkoutSessionPage({
  searchParams,
}: {
  searchParams: Promise<{ ses: string }>;
}) {
  const sessionId = (await searchParams).ses;
  const activityCategories = await getCategories();

  return (
    <div>
      <h3>Select a Category</h3>
      <div className="flex flex-wrap sm:justify-start justify-center">
        {activityCategories.map((c: ActivityCategoryDTO) => (
          <Link
            className="btn btn-secondary no-underline m-3 h-30 w-30 sm:h-35 sm:w-35"
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
    </div>
  );
}
