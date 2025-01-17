import { ActivityCategoryDTO } from '@repo/dto/activity-category';
import Link from 'next/link';
import { API_STRUCTURE_URL } from '../constants';

export default async function WorkoutPage() {
  const categoryResponse = await fetch(`${API_STRUCTURE_URL}/v1/categories`);
  const activityCategories = await categoryResponse.json();

  return (
    <div>
      <h3>Select a Category</h3>
      <div className="flex flex-wrap justify-center">
        {activityCategories.map((c: ActivityCategoryDTO) => (
          <div
            className="card card-compact border border-2 border-blue-300 m-2 basis-36 md:basis-52"
            key={c.slug}
          >
            <figure>
              <div className="after:content-['\01f3c3'] text-4xl md:text-6xl"></div>
            </figure>
            <div className="card-body capitalize">
              <h4 className="card-title text-sm md:text-lg">{c.title}</h4>
              <div className="card-actions justify-end">
                <Link
                  className="btn btn-primary btn-sm md:btn-lg"
                  href={{
                    pathname: '/workout-session/activity/',
                    query: { cs: c.slug },
                  }}
                >
                  Select
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
