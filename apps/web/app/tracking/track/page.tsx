export default async function TrackingActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ s: string }>;
}) {
  const activitySlug = (await searchParams).s;
  const activityResponse = await fetch(`http://localhost:8080/v1/activity/${activitySlug}`);
  const activity = await activityResponse.json();

  return <h3>track - {activity.title}</h3>;
}
