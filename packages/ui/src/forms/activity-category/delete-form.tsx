"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 capitalize"
      type="submit"
      aria-disabled={pending}
    >
      Delete
    </button>
  );
}

export function DeleteActivityCategoryForm({
  slug,
  deleteActivityCategoryAction,
}: {
  slug: string;
  deleteActivityCategoryAction: any;
}) {
  const [state, formAction] = useActionState(
    deleteActivityCategoryAction,
    initialState
  );

  return (
    <form action={formAction}>
      <input
        type="hidden"
        id="activity-category-slug"
        name="slug"
        value={slug}
      />
      <DeleteButton />
      <p>{state && state.message}</p>
    </form>
  );
}
