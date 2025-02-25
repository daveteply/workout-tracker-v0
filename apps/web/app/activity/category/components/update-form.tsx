'use client';

import { useState, useCallback } from 'react';
import { PencilIcon } from '@heroicons/react/16/solid';

import Modal from '../../../../components/modal';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';
import { ServerActionResponse } from '../../../constants';
import toast from 'react-hot-toast';

export function ActivityCategoryUpdateForm({
  updateActivityCategoryAction,
  dto,
}: {
  updateActivityCategoryAction: (formData: FormData) => Promise<ServerActionResponse>;
  dto: ActivityCategoryDTO;
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
      const result = await updateActivityCategoryAction(formData);
      setIsPending(false);

      if (!result.success && result.message) {
        toast.error(result.message);
      } else {
        closeModal();
        toast.success('Updated Activity Category');
      }
    },
    [updateActivityCategoryAction, closeModal],
  );

  return (
    <div>
      <button className="btn btn-sm" onClick={openModal}>
        <PencilIcon className="size-5 text-blue-500" />
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
              defaultValue={dto?.title}
              required
            />
          </label>

          <label className="floating-label mt-4">
            <span>Description</span>
            <textarea
              className="textarea textarea-bordered"
              id="activity-category-description"
              name="description"
              defaultValue={dto?.description}
              placeholder="Describe the Category"
              rows={3}
            />
          </label>

          <input type="hidden" id="activity-category-slug" name="slug" value={dto?.slug} />

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
              Save Activity Category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
