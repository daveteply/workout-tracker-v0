import Link from 'next/link';

export default async function Tracking() {
  const data = await fetch('http://localhost:8080/activity-category');
  const activityCategories = await data.json();

  return (
    <div>
      <h3>Tracking</h3>
      <h4>Select a Category</h4>
      <div className="flex">
        {activityCategories.map((c: any) => (
          <Link
            className="btn"
            key={c.slug}
            href={{
              pathname: 'tracking/activity/',
              query: { slug: c.slug },
            }}
          >
            {c.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
