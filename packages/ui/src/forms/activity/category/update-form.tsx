'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { PencilIcon } from '@heroicons/react/16/solid';

import WTModal from '@repo/ui/wt-modal';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';

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

export function ActivityCategoryUpdateForm({
  updateActivityCategoryAction,
  dto,
}: {
  updateActivityCategoryAction: any;
  dto: ActivityCategoryDTO;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverActionResult, formAction] = useActionState(
    updateActivityCategoryAction,
    initialState,
  );

  const openModal = () => {
    initialState.message = '';
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!serverActionResult?.message) {
      setIsModalOpen(false);
    }
  }, [serverActionResult]);

  return (
    <div>
      <button onClick={openModal}>
        <PencilIcon className="size-5 text-blue-500" />
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <p>Activity Category</p>
        <form action={formAction}>
          <input
            className="input input-bordered w-full max-w-xs mb-5"
            type="text"
            id="activity-category-title"
            name="attribute-title"
            defaultValue={dto?.title}
            required
          />
          <textarea
            className="input input-bordered w-full max-w-xs mb-5"
            id="activity-category-description"
            name="attribute-description"
            defaultValue={dto?.description}
          />
          <input type="hidden" id="activity-category-slug" name="slug" value={dto?.slug} />
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
