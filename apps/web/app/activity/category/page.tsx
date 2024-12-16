import { ActivityCategoryUpsertForm } from "@repo/ui/activity-category-upsert-form";
import { ActivityCategoryDeleteForm } from "@repo/ui/activity-category-delete-form";
import {
  createActivityCategory,
  deleteActivityCategory,
} from "./activity-category-actions";

export default async function ActivityCategoryPage() {
  const data = await fetch("http://localhost:8080/activity-category");
  const activityCategories = await data.json();

  return (
    <div>
      <h3>Activity Category</h3>
      <ActivityCategoryUpsertForm
        createActivityCategoryAction={createActivityCategory}
      />
      <div className="divider"></div>
      <ul>
        {activityCategories.map((ac: any) => (
          <li className="flex" key={ac.slug}>
            {ac.title}
            <ActivityCategoryDeleteForm
              slug={ac.slug}
              deleteActivityCategoryAction={deleteActivityCategory}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
