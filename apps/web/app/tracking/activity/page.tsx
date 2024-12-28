export default async function TrackingActivityPage(params: any) {
  const slug = (await params.searchParams).slug;
  const apiUrl = `http://localhost:8080/activity/${slug}`;

  const data = await fetch(apiUrl);
  const activities = await data.json();

  return (
    <div>
      <h3>Tracking - Activity</h3>
      {activities.map((a: any) => (
        <h4 className="m1 capitalize" key={a.slug}>
          {a.title}
        </h4>
      ))}
    </div>
  );
}
