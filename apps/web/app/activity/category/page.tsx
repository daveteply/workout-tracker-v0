import Link from 'next/link';

import { ActivityCategoryDTO } from '@repo/dto/activity-category';
import {
  createActivityCategory,
  deleteActivityCategory,
  updateActivityCategory,
} from './activity-category-actions';
import { ActivityCategoryCreateForm } from './components/create-form';
import { ActivityCategoryDeleteForm } from './components/delete-form';
import { ActivityCategoryUpdateForm } from './components/update-form';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { getCategories } from '../../../utils/data-fetch';

export default async function ActivityCategoryPage() {
  const activityCategories = await getCategories();

  return (
    <div>
      <h3>Activity Categories</h3>
      <ActivityCategoryCreateForm createActivityCategoryAction={createActivityCategory} />
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activityCategories.map((ac: ActivityCategoryDTO) => (
              <tr key={ac.slug}>
                <td className="capitalize">{ac.title}</td>
                <td>{ac.description}</td>
                <td>
                  <div className="flex flex-col sm:flex-row sm:justify-end">
                    <ActivityCategoryUpdateForm
                      dto={ac}
                      updateActivityCategoryAction={updateActivityCategory}
                    />
                    {ac.slug && (
                      <ActivityCategoryDeleteForm
                        slug={ac.slug}
                        deleteActivityCategoryAction={deleteActivityCategory}
                      />
                    )}
                    <Link
                      className="btn btn-sm no-underline text-blue-500"
                      href={{ pathname: '/activity/category/activities', query: { cs: ac.slug } }}
                    >
                      <div className="hidden sm:inline">Activities</div>
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
