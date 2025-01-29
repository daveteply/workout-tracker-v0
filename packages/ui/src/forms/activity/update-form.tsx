'use client';

import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/16/solid';

import WTModal from '@repo/ui/wt-modal';
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
      // TODO toast error
    }
  };

  return (
    <div>
      <button onClick={openModal}>
        <PencilIcon className="size-5 text-blue-500" />
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <p>Activity</p>
        <form onSubmit={handleSubmit}>
          <input
            className="input input-bordered w-full max-w-xs mb-5"
            type="text"
            id="activity-title"
            name="title"
            defaultValue={dto?.title}
            required
          />
          <textarea
            className="input input-bordered w-full max-w-xs mb-5"
            id="activity-description"
            name="description"
            defaultValue={dto?.description}
          />
          <input type="hidden" name="activity-slug" value={dto.slug} />
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
              Save Changes
            </button>
          </div>
        </form>
      </WTModal>
    </div>
  );
}
