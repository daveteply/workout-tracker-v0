'use client';

import { useState } from 'react';
import WTModal from '@repo/ui/wt-modal';

export function ActivityCreateForm({
  createActivityAction,
  activityCategorySlug,
}: {
  createActivityAction: any;
  activityCategorySlug: string;
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
    const result = await createActivityAction(null, formData);
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
        Add Activity
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <p>Activity</p>
        <form onSubmit={handleSubmit}>
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
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isPending}
              aria-disabled={isPending}
            >
              Add Activity
            </button>
          </div>
        </form>
      </WTModal>
    </div>
  );
}
