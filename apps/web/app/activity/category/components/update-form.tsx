'use client';

import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/16/solid';

import Modal from '../../../../components/modal';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';

export function ActivityCategoryUpdateForm({
  updateActivityCategoryAction,
  dto,
}: {
  updateActivityCategoryAction: any;
  dto: ActivityCategoryDTO;
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
    const result = await updateActivityCategoryAction(null, formData);
    setIsPending(false);

    if (!result) {
      setIsModalOpen(false);
    } else {
      // TODO: toast error
    }
  };

  return (
    <div>
      <button className="btn btn-sm" onClick={openModal}>
        <PencilIcon className="size-5 text-blue-500" />
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
            <button className="btn" onClick={() => setIsModalOpen(false)} disabled={isPending}>
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
