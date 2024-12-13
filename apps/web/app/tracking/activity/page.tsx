export default async function TrackingActivityPage(params: any) {
  const slug = params.searchParams.slug;
  const url = `http://localhost:8080/activity/${slug}`;

  const data = await fetch(url);
  const activities = await data.json();

  return (
    <div>
      <h3>Tracking - Activity</h3>
      {activities.map((a: any) => (
        <h3 className="m1 capitalize" key={a.slug}>
          {a.title}
        </h3>
      ))}
    </div>
  );
}
