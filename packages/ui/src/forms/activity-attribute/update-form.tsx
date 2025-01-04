'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { PencilIcon } from '@heroicons/react/16/solid';

import WTModal from '@repo/ui/wt-modal';
import { ActivityDTO } from '@repo/dto/activity';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" aria-disabled={pending}>
      Save Changes
    </button>
  );
}

export function ActivityAttributeUpdateForm({
  updateActivityAction,
  dto,
}: {
  updateActivityAction: any;
  dto: ActivityDTO;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverActionResult, formAction] = useActionState(updateActivityAction, initialState);

  useEffect(() => {
    if (!serverActionResult?.message) {
      setIsModalOpen(false);
    }
  }, [serverActionResult]);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        <PencilIcon className="size-5 text-blue-500" />
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <p>Activity</p>
        <form action={formAction}>
          <input
            className="input input-bordered w-full max-w-xs mb-5"
            type="text"
            id="activity-title"
            name="title"
            defaultValue={dto?.title}
            required
          />
          <input type="hidden" name="activity-slug" value={dto.slug} />
          <input type="hidden" name="activity-category-slug" value={dto.categorySlug} />
          <div className="modal-action">
            <button className="btn" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <SubmitButton />
          </div>
        </form>
      </WTModal>
    </div>
  );
}
