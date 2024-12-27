import { ActivityUpsertForm } from '@repo/ui/activity-upsert-form';
import { createActivity } from './activity-actions';

export default async function ActivityPage(params: any) {
  const slug = (await params.searchParams).slug;
  const categoryData = await fetch(
    `http://localhost:8080/activity-category/${slug}`
  );
  const activityCategory = await categoryData.json();
  const activityCategorySlug = activityCategory?.slug;

  const activityData = await fetch(
    `http://localhost:8080/activity/${activityCategorySlug}`
  );
  const activities = await activityData.json();

  return (
    <div>
      <h3>
        <p>
          Activities for category&nbsp;
          <span className="font-bold italic capitalize">
            {activityCategory?.title}
          </span>
        </p>
      </h3>
      <ActivityUpsertForm createActivityAction={createActivity} />
      <div className="divider"></div>
      {activities.map((a: any) => (
        <div className="capitalize" key={a.activity_id}>
          {a.title}
        </div>
      ))}
    </div>
  );
}
