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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [serverActionResult, formAction] = useActionState(
    createActivityCategoryAction,
    initialState,
  );

  useEffect(() => {
    if (!serverActionResult?.message) {
      handleCloseModal();
    }
  }, [serverActionResult]);

  return (
    <div>
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Add Activity Category
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={handleCloseModal}>
        <p>Activity Category</p>
        <form action={formAction}>
          <input
            type="text"
            id="activity-category-title"
            name="title"
            placeholder="Activity Category Title"
            required
          />
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
