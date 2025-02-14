'use client';

import { useState, useCallback } from 'react';
import Modal from '../../../../components/modal';
import { ServerActionResponse } from '../../../constants';
import toast from 'react-hot-toast';

export function ActivityCategoryCreateForm({
  createActivityCategoryAction,
}: {
  createActivityCategoryAction: (formData: FormData) => Promise<ServerActionResponse>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsPending(true);
      const formData = new FormData(event.currentTarget);
      const result = await createActivityCategoryAction(formData);
      setIsPending(false);

      if (!result.success) {
        toast.error(result.message);
      } else {
        closeModal();
        toast.success('Created Activity Category');
      }
    },
    [createActivityCategoryAction, closeModal],
  );

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        Add Activity Category
      </button>
      <Modal isOpen={isModalOpen} hideClose onClose={closeModal}>
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
            <button className="btn" onClick={closeModal} disabled={isPending}>
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
