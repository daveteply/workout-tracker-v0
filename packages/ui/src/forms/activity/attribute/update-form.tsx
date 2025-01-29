'use client';

import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/16/solid';

import WTModal from '@repo/ui/wt-modal';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';

export function ActivityAttributeUpdateForm({
  updateActivityAttributeAction,
  attributeTypes,
  dto,
}: {
  updateActivityAttributeAction: any;
  attributeTypes: string[];
  dto: ActivityAttributeDTO;
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
    const result = await updateActivityAttributeAction(null, formData);
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
        <p>Activity Attribute</p>
        <form onSubmit={handleSubmit}>
          <input
            className="input input-bordered w-1/2 max-w-xs mb-5"
            type="text"
            id="activity-attribute-title"
            name="title"
            placeholder="Attribute title"
            defaultValue={dto.title}
            required
          />
          <input
            className="input input-bordered w-full max-w-xs mb-5"
            type="text"
            id="activity-attribute-description"
            name="description"
            placeholder="Description"
            defaultValue={dto.description}
            maxLength={45}
          />
          <select
            className="select select-bordered w-1/3 max-w-xs mb-5"
            id="activity-attribute-type"
            name="attribute-type"
            defaultValue={dto.attributeType}
          >
            {attributeTypes.map((attributeType) => (
              <option key={attributeType} value={attributeType}>
                {attributeType}
              </option>
            ))}
          </select>
          <input type="hidden" id="activity-attribute-slug" name="slug" value={dto?.slug} />
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
