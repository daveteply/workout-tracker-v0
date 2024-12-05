import { ActivityCategoryForm } from "@repo/ui/activity-category-add-form";
import { DeleteActivityCategoryForm } from "@repo/ui/activity-category-delete-form";
import {
  createActivityCategory,
  deleteActivityCategory,
} from "./activity-category-actions";

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
          <li className="flex" key={ac.slug}>
            {ac.title}
            <DeleteActivityCategoryForm
              slug={ac.slug}
              deleteActivityCategoryAction={deleteActivityCategory}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
