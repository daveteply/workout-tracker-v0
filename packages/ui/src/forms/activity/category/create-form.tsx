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
      Add Activity Category
    </button>
  );
}

export function ActivityCategoryCreateForm({
  createActivityCategoryAction,
}: {
  createActivityCategoryAction?: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverActionResult, formAction] = useActionState(
    createActivityCategoryAction,
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
      <button className="btn btn-primary" onClick={openModal}>
        Add Activity Category
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <p>Activity Category</p>
        <form action={formAction}>
          <input
            className="input input-bordered w-full max-w-xs mb-5"
            type="text"
            id="activity-category-title"
            name="title"
            placeholder="Activity Category Title"
            required
          />
          <textarea
            className="input input-bordered w-full max-w-xs mb-5"
            id="activity-category-description"
            name="description"
          />
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
