'use client';

import { XCircleIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

export function ActivityAttributesRemoveForm({
  deleteActivityAttributesAction,
  activitySlug,
  attributeSlug,
}: {
  deleteActivityAttributesAction: any;
  activitySlug: string;
  attributeSlug: string | undefined;
}) {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    const result = await deleteActivityAttributesAction(null, formData);
    setIsPending(false);

    if (result) {
      console.error('Bummer!', result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" id="activity-slug" name="activity-slug" value={activitySlug} />
      <input type="hidden" id="attribute-slug" name="attribute-slug" value={attributeSlug} />
      <button type="submit" disabled={isPending} aria-disabled={isPending}>
        <XCircleIcon className="size-5 text-blue-500"></XCircleIcon>
      </button>{' '}
    </form>
  );
}
