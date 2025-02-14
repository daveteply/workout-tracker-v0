'use client';

import { XCircleIcon } from '@heroicons/react/16/solid';
import { useState, useCallback } from 'react';
import { ServerActionResponse } from '../../../../../constants';
import toast from 'react-hot-toast';

export function ActivityAttributesRemoveForm({
  deleteActivityAttributesAction,
  activitySlug,
  attributeSlug,
}: {
  deleteActivityAttributesAction: (formData: FormData) => Promise<ServerActionResponse>;
  activitySlug: string;
  attributeSlug?: string;
}) {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsPending(true);
      const formData = new FormData(event.currentTarget);
      const result = await deleteActivityAttributesAction(formData);
      setIsPending(false);

      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success('Successfully removed');
      }
    },
    [deleteActivityAttributesAction],
  );

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" id="activity-slug" name="activity-slug" value={activitySlug} />
      <input type="hidden" id="attribute-slug" name="attribute-slug" value={attributeSlug} />
      <button className="btn btn-sm" type="submit" disabled={isPending} aria-disabled={isPending}>
        <XCircleIcon className="size-5 text-blue-500" />
      </button>
    </form>
  );
}
