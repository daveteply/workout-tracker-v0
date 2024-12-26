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
        Activities for category{' '}
        <span className="font-bold italic">{activityCategory?.title}</span>
      </h3>
      <ul>
        {activities.map((a: any) => (
          <li key={a.slug}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
}
