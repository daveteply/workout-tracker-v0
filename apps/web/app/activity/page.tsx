import { ActivityDTO } from '@repo/dto/activity';
import { ActivityCreateForm } from '@repo/ui/activity-create-form';
import { ActivityUpdateForm } from '@repo/ui/activity-update-form';
import { ActivityDeleteForm } from '@repo/ui/activity-delete-form';
import { createActivity, deleteActivity, updateActivity } from './activity-actions';

export default async function ActivityPage(params: any) {
  // Activity Category
  const activityCategorySlug = (await params.searchParams).cs;
  const categoryData = await fetch(
    `http://localhost:8080/v1/activity-category/${activityCategorySlug}`,
  );
  const activityCategory = await categoryData.json();

  // Activities
  const activityData = await fetch(`http://localhost:8080/v1/activity/${activityCategorySlug}`);
  const activities = await activityData.json();

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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a: ActivityDTO) => (
              <tr key={a.slug}>
                <td>{a.title}</td>
                <td>
                  <div className="flex justify-end">
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
