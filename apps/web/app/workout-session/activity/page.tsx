import Link from 'next/link';
import { ActivityDTO } from '@repo/dto/activity';
import { API_STRUCTURE_URL } from '../../constants';

export default async function WorkoutActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ cs: string }>;
}) {
  // Activity Category
  const activityCategorySlug = (await searchParams).cs;
  const categoryResponse = await fetch(
    `${API_STRUCTURE_URL}/v1/categories/${activityCategorySlug}`,
  );
  const activityCategory = await categoryResponse.json();

  // Activities for category
  const activityResponse = await fetch(
    `${API_STRUCTURE_URL}/v1/activities/category/${activityCategorySlug}`,
  );
  const activities = await activityResponse.json();

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
                  href={{ pathname: '/workout-session/activity/track', query: { s: a.slug } }}
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
