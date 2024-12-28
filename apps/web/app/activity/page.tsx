import { ActivityUpsertForm } from '@repo/ui/activity-upsert-form';
import { createActivity, deleteActivity } from './activity-actions';
import { ActivityDeleteForm } from '@repo/ui/activity-delete-form';

export default async function ActivityPage(params: any) {
  // Activity Category
  const activityCategorySlug = (await params.searchParams).catSlug;
  const categoryData = await fetch(
    `http://localhost:8080/activity-category/${activityCategorySlug}`,
  );
  const activityCategory = await categoryData.json();

  // Activities
  const activityData = await fetch(`http://localhost:8080/activity/${activityCategorySlug}`);
  const activities = await activityData.json();

  return (
    <div>
      <h3>
        <p>
          Activities for category&nbsp;
          <span className="font-bold italic capitalize">{activityCategory?.title}</span>
        </p>
      </h3>
      <ActivityUpsertForm
        createActivityAction={createActivity}
        activityCategorySlug={activityCategorySlug}
      />
      <div className="divider"></div>
      {activities.map((a: any) => (
        <div className="capitalize flex" key={a.activity_id}>
          {a.title}
          <ActivityDeleteForm slug={a.slug} deleteActivityAction={deleteActivity} />
        </div>
      ))}
    </div>
  );
}
