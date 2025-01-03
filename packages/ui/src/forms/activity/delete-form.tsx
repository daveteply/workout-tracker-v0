'use client';

import { TrashIcon } from '@heroicons/react/16/solid';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

const initialState = {
  message: '',
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      <TrashIcon className="size-5 text-blue-500"></TrashIcon>
    </button>
  );
}

export function ActivityDeleteForm({
  deleteActivityAction,
  slug,
}: {
  slug: string;
  deleteActivityAction: any;
}) {
  const [serverActionResult, formAction] = useActionState(deleteActivityAction, initialState);

  useEffect(() => {
    // TODO: create toast system
    if (serverActionResult?.message) {
      console.error('server action result: ', serverActionResult);
    }
  }, [serverActionResult]);

  return (
    <form action={formAction}>
      <input type="hidden" id="activity-slug" name="slug" value={slug} />
      <DeleteButton />
    </form>
  );
}
