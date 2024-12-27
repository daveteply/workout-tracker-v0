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
          <span className="font-bold italic">{activityCategory?.title}</span>
        </p>
      </h3>
      <div>
        {activities.map((a: any) => (
          <div key={a.activity_id}>{a.title}</div>
        ))}
      </div>
    </div>
  );
}
