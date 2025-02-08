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
      <div className="flex flex-wrap justify-center md:justify-start">
        {activities.map((a: ActivityDTO) => (
          <div
            className="card card-compact border border-2 border-blue-300 m-2 basis-36 md:basis-52"
            key={a.slug}
          >
            <figure>
              <div className="after:content-['\01F3A0'] text-4xl md:text-6xl"></div>
            </figure>

            <div className="card-body capitalize">
              <h4 className="card-title text-sm md:text-lg">{a.title}</h4>
              <div className="card-actions justify-end">
                <Link
                  className="btn btn-primary m1 capitalize"
                  href={{ pathname: './activity/track', query: { s: a.slug, secs: sessionId } }}
                >
                  Track
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
