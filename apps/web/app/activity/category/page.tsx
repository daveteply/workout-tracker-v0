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
  const data = await fetch('http://localhost:8080/activity-category');
  const activityCategories = await data.json();

  return (
    <div>
      <h3>Activity Category</h3>
      <ActivityCategoryCreateForm createActivityCategoryAction={createActivityCategory} />
      <div className="divider"></div>
      {activityCategories.map((ac: ActivityCategoryDTO) => (
        <div className="flex" key={ac.slug}>
          {ac.title}
          <Link
            className="btn btn-sm mx-1"
            href={{ pathname: '/activity/', query: { cs: ac.slug } }}
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
      ))}
    </div>
  );
}
