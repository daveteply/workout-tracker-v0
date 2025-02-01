'use client';

import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/16/solid';

import Modal from '../../../../../components/modal';
import { ActivityDTO } from '@repo/dto/activity';

export function ActivityUpdateForm({
  updateActivityAction,
  dto,
}: {
  updateActivityAction: any;
  dto: ActivityDTO;
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
    const result = await updateActivityAction(null, formData);
    setIsPending(false);

    if (!result) {
      setIsModalOpen(false);
    } else {
      // TODO: toast error
    }
  };

  return (
    <div>
      <button onClick={openModal}>
        <PencilIcon className="size-5 text-blue-500" />
      </button>
      <Modal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label className="floating-label mb-2">
            <span>Activity Title</span>
            <input
              className="input input-bordered"
              type="text"
              id="activity-title"
              name="title"
              defaultValue={dto?.title}
              placeholder="Enter Activity Title"
              required
            />
          </label>

          <label className="floating-label mt-4">
            <span>Description</span>
            <textarea
              className="textarea textarea-bordered"
              id="activity-description"
              name="description"
              rows={3}
              defaultValue={dto?.description}
              placeholder="Describe this Activity"
            />
          </label>

          <input type="hidden" name="category-slug" value={dto.slug} />

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
              Save Activity
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
