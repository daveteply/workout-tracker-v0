"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 capitalize"
      type="submit"
      aria-disabled={pending}
    >
      Add
    </button>
  );
}

export function ActivityCategoryForm({ createActivityCategoryAction }: any) {
  const [state, formAction] = useActionState(
    createActivityCategoryAction,
    initialState
  );

  return (
    <form action={formAction}>
      <input type="text" id="activity-category-title" name="title" required />
      <SubmitButton />
      <p>{state.message}</p>
    </form>
  );
}
