import Link from 'next/link';

import { ActivityDTO } from '@repo/dto/activity';
import { createActivity, deleteActivity, updateActivity } from '../../activity-actions';
import { ActivityCreateForm } from './components/create-form';
import { ActivityDeleteForm } from './components/delete-form';
import { ActivityUpdateForm } from './components/update-form';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { getCategory, getCategoryActivities } from '../../../../utils/data-fetch';
import { CrumbTrail, CrumbTrailEntry } from '../../../components/crumb-trail';

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ cs: string }>;
}) {
  const activityCategorySlug = (await searchParams).cs;

  const [activityCategory, activities] = await Promise.all([
    getCategory(activityCategorySlug),
    getCategoryActivities(activityCategorySlug),
  ]);

  const crumbEntries: CrumbTrailEntry[] = [
    { label: 'Categories', pathname: '/activity/category', query: { cs: activityCategorySlug } },
    { label: 'Activities' },
  ];

  return (
    <div>
      <CrumbTrail entries={crumbEntries} />
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
                  <div className="flex flex-col sm:flex-row sm:justify-end">
                    <ActivityUpdateForm updateActivityAction={updateActivity} dto={a} />
                    {a.slug && (
                      <ActivityDeleteForm deleteActivityAction={deleteActivity} slug={a.slug} />
                    )}
                    <Link
                      className="btn btn-sm no-underline text-blue-500"
                      href={{
                        pathname: '/activity/category/activities/attributes',
                        query: { s: a.slug, cs: activityCategorySlug },
                      }}
                    >
                      <div className="hidden sm:inline">Attributes</div>
                      <EllipsisVerticalIcon className="size-5 text-blue-500 sm:hidden" />
                    </Link>
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
