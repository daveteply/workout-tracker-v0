'use client';

import { useState } from 'react';
import WTModal from '@repo/ui/wt-modal';

export function ActivityCategoryCreateForm({
  createActivityCategoryAction,
}: {
  createActivityCategoryAction?: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    const result = await createActivityCategoryAction(null, formData);
    setIsPending(false);

    if (!result) {
      setIsModalOpen(false);
    } else {
      // TODO: toast error
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        Add Activity Category
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <p>Activity Category</p>
        <form onSubmit={handleSubmit}>
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
            <button className="btn" onClick={() => setIsModalOpen(false)} disabled={isPending}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isPending}
              aria-disabled={isPending}
            >
              Add Activity Category
            </button>
          </div>
        </form>
      </WTModal>
    </div>
  );
}
