'use client';

import { XCircleIcon } from '@heroicons/react/16/solid';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

const initialState = {
  message: '',
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      <XCircleIcon className="size-5 text-blue-500"></XCircleIcon>
    </button>
  );
}

export function ActivityAttributesRemoveForm({
  deleteActivityAttributesAction,
  activitySlug,
  attributeSlug,
}: {
  deleteActivityAttributesAction: any;
  activitySlug: string;
  attributeSlug: string;
}) {
  const [serverActionResult, formAction] = useActionState(
    deleteActivityAttributesAction,
    initialState,
  );

  useEffect(() => {
    // TODO: create toast system
    if (serverActionResult?.message) {
      console.error('server action result: ', serverActionResult);
    }
  }, [serverActionResult]);

  return (
    <form action={formAction}>
      <input type="hidden" id="activity-slug" name="activity-slug" value={activitySlug} />
      <input type="hidden" id="attribute-slug" name="attribute-slug" value={attributeSlug} />
      <DeleteButton />
    </form>
  );
}
