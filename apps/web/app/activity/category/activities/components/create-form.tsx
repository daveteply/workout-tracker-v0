'use client';

import { useState } from 'react';
import Modal from '../../../../../components/modal';

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
      <Modal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs mb-2">
            <div className="label">
              <span className="label-text">Activity Title</span>
            </div>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              id="activity-title"
              name="title"
              placeholder="Enter Activity Title"
              required
            />
          </label>

          <label className="form-control w-full max-w-xs mb-2">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered w-full max-w-xs"
              id="activity-description"
              name="description"
              rows={3}
              placeholder="Describe this Activity"
            />
          </label>

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
      </Modal>
    </div>
  );
}
