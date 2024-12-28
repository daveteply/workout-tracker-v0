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
  slug,
  deleteActivityAction,
}: {
  slug: string;
  deleteActivityAction: any;
}) {
  const [serverActionResult, formAction] = useActionState(deleteActivityAction, initialState);

  useEffect(() => {
    // TODO: create toast system
    console.info('server action result: ', serverActionResult);
    // if (!serverActionResult.success) {    }
  }, [serverActionResult]);

  return (
    <form action={formAction}>
      <input type="hidden" id="activity-slug" name="slug" value={slug} />
      <DeleteButton />
    </form>
  );
}
