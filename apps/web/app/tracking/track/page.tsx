export default async function TrackingActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ s: string }>;
}) {
  const activitySlug = (await searchParams).s;
  const activityData = await fetch(`http://localhost:8080/v1/activity/${activitySlug}`);
  const activity = await activityData.json();

  return <h3>track - {activity.title}</h3>;
}
