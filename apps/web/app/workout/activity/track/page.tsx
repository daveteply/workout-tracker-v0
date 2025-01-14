import { TrackingForm } from '@repo/ui/tracking-form';

export default async function TrackingActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ s: string }>;
}) {
  const activitySlug = (await searchParams).s;

  // Activity
  const activityResponse = await fetch(`http://localhost:8080/v1/activities/${activitySlug}`);
  const activity = await activityResponse.json();

  // Activity Attributes
  const activityAttributesResponse = await fetch(
    `http://localhost:8080/v1/activity-attributes/activity/${activitySlug}`,
  );
  const activityAttributes = await activityAttributesResponse.json();

  return (
    <div>
      <h3>Tracking Activity - {activity.title}</h3>
      <TrackingForm activityAttributes={activityAttributes} />
    </div>
  );
}
