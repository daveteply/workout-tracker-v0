import { NavLinkButton } from '@repo/ui/nav-link-button';

export default async function Tracking() {
  const data = await fetch('http://localhost:8080/activity-category');
  const activityCategories = await data.json();

  const createLink = (slugId: string) => {
    return `tracking/activity?slug=${slugId}`;
  };

  return (
    <div>
      <h1>Tracking</h1>
      <h2>Select a Category</h2>
      <div className="flex">
        {activityCategories.map((c: any) => (
          <NavLinkButton
            key={c.slug}
            link={createLink(c.slug)}
            title={c.title}
            // href={{
            //   pathname: "tracking/activity/",
            //   query: { slug: c.slug },
            // }}
          ></NavLinkButton>
        ))}
      </div>
    </div>
  );
}
