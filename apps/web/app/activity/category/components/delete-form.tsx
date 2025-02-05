'use client';

import { TrashIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { ServerActionResponse } from '../../../constants';
import toast from 'react-hot-toast';

export function ActivityCategoryDeleteForm({
  deleteActivityCategoryAction,
  slug,
}: {
  deleteActivityCategoryAction: (formData: FormData) => Promise<ServerActionResponse>;
  slug: string;
}) {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);

    const result = await deleteActivityCategoryAction(formData);

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success('Deleted Activity Category');
    }

    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" id="activity-category-slug" name="slug" value={slug} />
      <button className="btn btn-sm" type="submit" disabled={isPending} aria-disabled={isPending}>
        <TrashIcon className="size-5 text-blue-500"></TrashIcon>
      </button>
    </form>
  );
}
