'use client';

import { TrashIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

export function ActivityCategoryDeleteForm({
  deleteActivityCategoryAction,
  slug,
}: {
  deleteActivityCategoryAction: any;
  slug: string;
}) {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);

    const result = await deleteActivityCategoryAction(null, formData);
    if (result) {
      console.error('Bummer!', result);
    }

    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" id="activity-category-slug" name="slug" value={slug} />
      <button type="submit" disabled={isPending} aria-disabled={isPending}>
        <TrashIcon className="size-5 text-blue-500"></TrashIcon>
      </button>
    </form>
  );
}
