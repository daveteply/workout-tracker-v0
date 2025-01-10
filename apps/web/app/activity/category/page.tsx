import Link from 'next/link';

import { ActivityCategoryCreateForm } from '@repo/ui/activity-category-create-form';
import { ActivityCategoryUpdateForm } from '@repo/ui/activity-category-update-form';
import { ActivityCategoryDeleteForm } from '@repo/ui/activity-category-delete-form';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';
import {
  createActivityCategory,
  deleteActivityCategory,
  updateActivityCategory,
} from './activity-category-actions';

export default async function ActivityCategoryPage() {
  const activityCategoryResponse = await fetch('http://localhost:8080/v1/categories');
  const activityCategories = await activityCategoryResponse.json();

  return (
    <div>
      <h3>Activity Categories</h3>
      <ActivityCategoryCreateForm createActivityCategoryAction={createActivityCategory} />
      <div className="overflow-x-auto">
        <table className="table table-xs md:table-md">
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
                  <div className="flex justify-end">
                    <Link
                      className="btn btn-sm mx-1"
                      href={{ pathname: '/activity/category/activities', query: { cs: ac.slug } }}
                    >
                      Activities
                    </Link>
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
