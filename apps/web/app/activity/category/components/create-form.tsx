'use client';

import { useState } from 'react';
import Modal from '../../../../components/modal';

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
      <Modal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label className="floating-label mb-2">
            <span>Activity Category Title</span>
            <input
              className="input input-bordered"
              type="text"
              id="activity-category-title"
              name="title"
              placeholder="Enter Activity Category Title"
              required
            />
          </label>

          <label className="floating-label mt-4">
            <span>Description</span>
            <textarea
              className="textarea textarea-bordered"
              id="activity-category-description"
              name="description"
              placeholder="Describe the Category"
              rows={3}
            />
          </label>

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
      </Modal>
    </div>
  );
}
