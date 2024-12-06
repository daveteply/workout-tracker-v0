"use client";

import { TrashIcon } from "@heroicons/react/16/solid";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      <TrashIcon className="size-5 text-blue-500"></TrashIcon>
    </button>
  );
}

export function ActivityCategoryDeleteForm({
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
