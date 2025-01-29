'use client';

import { TrashIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

export function ActivityDeleteForm({
  deleteActivityAction,
  slug,
}: {
  slug: string;
  deleteActivityAction: any;
}) {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    const result = await deleteActivityAction(null, formData);
    setIsPending(false);

    if (result) {
      console.error('Bummer!', result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" id="activity-slug" name="slug" value={slug} />
      <button type="submit" disabled={isPending} aria-disabled={isPending}>
        <TrashIcon className="size-5 text-blue-500"></TrashIcon>
      </button>
    </form>
  );
}
