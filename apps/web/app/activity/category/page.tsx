import { ActivityCategoryForm } from "@repo/ui/activity-category-form";
import { createActivityCategory } from "./activity-category-actions";

export default async function ActivityCategoryPage() {
  const data = await fetch("http://localhost:8080/activity-category");
  const activityCategories = await data.json();

  return (
    <div>
      <h1>Activity Category</h1>
      <ActivityCategoryForm
        createActivityCategoryAction={createActivityCategory}
      />
      <hr />
      <ul>
        {activityCategories.map((ac: any) => (
          <li key={ac.slug}>{ac.title}</li>
        ))}
      </ul>
    </div>
  );
}
