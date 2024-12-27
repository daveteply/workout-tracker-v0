import Link from 'next/link';

import { ActivityCategoryUpsertForm } from '@repo/ui/activity-category-upsert-form';
import { ActivityCategoryDeleteForm } from '@repo/ui/activity-category-delete-form';
import {
  createActivityCategory,
  deleteActivityCategory,
} from './activity-category-actions';

export default async function ActivityCategoryPage() {
  const data = await fetch('http://localhost:8080/activity-category');
  const activityCategories = await data.json();

  return (
    <div>
      <h3>Activity Category</h3>
      <ActivityCategoryUpsertForm
        createActivityCategoryAction={createActivityCategory}
      />
      <div className="divider"></div>
      {activityCategories.map((ac: any) => (
        <div className="flex" key={ac.slug}>
          {ac.title}
          <Link
            className="btn btn-sm mx-1"
            href={{ pathname: '/activity/', query: { slug: ac.slug } }}
          >
            Activities
          </Link>
          <ActivityCategoryDeleteForm
            slug={ac.slug}
            deleteActivityCategoryAction={deleteActivityCategory}
          />
        </div>
      ))}
    </div>
  );
}
