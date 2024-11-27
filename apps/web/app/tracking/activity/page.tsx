export default async function TrackingActivityPage(params: any) {
  const slug = params.searchParams.slug;
  const url = `http://localhost:8080/activity/${slug}`;
  console.log(111, url);

  const data = await fetch(url);

  const activities = await data.json();
  console.log(112, activities);

  return (
    <div>
      <h1>Tracking - Activity</h1>
      {activities.map((a: any) => (
        <h3 className="m1 capitalize" key={a.slug}>
          {a.title}
        </h3>
      ))}
    </div>
  );
}
