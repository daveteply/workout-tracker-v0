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
  dto?: ActivityCategoryDTO;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [serverActionResult, formAction] = useActionState(
    updateActivityCategoryAction,
    initialState,
  );

  useEffect(() => {
    if (!serverActionResult?.message) {
      handleCloseModal();
    }
  }, [serverActionResult]);

  return (
    <div>
      <button onClick={handleOpenModal}>
        <PencilIcon className="size-5 text-blue-500" />
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={handleCloseModal}>
        <p>Activity Category</p>
        <form action={formAction}>
          <input
            type="text"
            id="activity-category-title"
            name="title"
            defaultValue={dto?.title}
            required
          />
          <input type="hidden" id="activity-category-slug" name="slug" value={dto?.slug} />
          <div className="modal-action">
            <button className="btn" onClick={handleCloseModal}>
              Cancel
            </button>
            <SubmitButton />
          </div>
        </form>
      </WTModal>
    </div>
  );
}
