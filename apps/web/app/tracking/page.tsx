import Link from 'next/link';

export default async function Tracking() {
  const data = await fetch('http://localhost:8080/activity-category');
  const activityCategories = await data.json();

  return (
    <div>
      <h3>Tracking</h3>
      <h4>Select a Category:</h4>
      <div className="flex flex-wrap">
        {activityCategories.map((c: any) => (
          <div className="card card-compact w-60 border border-blue-400 m-2" key={c.slug}>
            <figure>
              <div className="text-6xl after:content-['\01f3c3']"></div>
            </figure>
            <div className="card-body capitalize">
              <h4 className="card-title">{c.title}</h4>
              <div className="card-actions justify-end">
                <Link
                  className="btn btn-primary"
                  href={{
                    pathname: 'tracking/activity/',
                    query: { cs: c.slug },
                  }}
                >
                  Select
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
