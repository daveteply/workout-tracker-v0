'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import WTModal from '@repo/ui/wt-modal';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" aria-disabled={pending}>
      Add Activity
    </button>
  );
}

export function ActivityCreateForm({
  createActivityAction,
  activityCategorySlug,
}: {
  createActivityAction: any;
  activityCategorySlug: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverActionResult, formAction] = useActionState(createActivityAction, initialState);

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
      <button className="btn btn-primary" onClick={openModal}>
        Add Activity
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <p>Activity</p>
        <form action={formAction}>
          <input
            className="input input-bordered w-full max-w-xs mb-5"
            type="text"
            id="activity-title"
            name="title"
            placeholder="Activity Title"
            required
          />
          <textarea
            className="input input-bordered w-full max-w-xs mb-5"
            id="activity-description"
            name="description"
          />
          <input type="hidden" name="category-slug" value={activityCategorySlug} />
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
