import Link from 'next/link';

import { ActivityDTO } from '@repo/dto/activity';
import { createActivity, deleteActivity, updateActivity } from '../../activity-actions';
import { ActivityCreateForm } from './components/create-form';
import { ActivityDeleteForm } from './components/delete-form';
import { ActivityUpdateForm } from './components/update-form';
import { API_STRUCTURE_URL } from '../../../constants';

export default async function ActivityPage({
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

  // Activities for Category
  const activityResponse = await fetch(
    `${API_STRUCTURE_URL}/v1/activities/category/${activityCategorySlug}`,
  );
  const activities = await activityResponse.json();

  return (
    <div>
      <h3>
        <p>
          Activities for category&nbsp;
          <span className="font-bold italic capitalize">{activityCategory?.title}</span>
        </p>
      </h3>
      <ActivityCreateForm
        createActivityAction={createActivity}
        activityCategorySlug={activityCategorySlug}
      />
      <div className="overflow-x-auto">
        <table className="table table-xs md:table-md">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a: ActivityDTO) => (
              <tr key={a.slug}>
                <td className="capitalize">{a.title}</td>
                <td>{a.description}</td>
                <td>
                  <div className="flex justify-end">
                    <Link
                      className="btn btn-sm mx-1"
                      href={{
                        pathname: '/activity/category/activities/attributes',
                        query: { s: a.slug },
                      }}
                    >
                      Attributes
                    </Link>
                    <ActivityUpdateForm updateActivityAction={updateActivity} dto={a} />
                    {a.slug && (
                      <ActivityDeleteForm deleteActivityAction={deleteActivity} slug={a.slug} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
