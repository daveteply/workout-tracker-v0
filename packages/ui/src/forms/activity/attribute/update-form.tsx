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
      // TODO: toast error
    }
  };

  return (
    <div>
      <button onClick={openModal}>
        <PencilIcon className="size-5 text-blue-500" />
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs mb-2">
            <div className="label">
              <span className="label-text">Attribute Title</span>
            </div>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              id="activity-attribute-title"
              name="title"
              placeholder="Enter Attribute title"
              defaultValue={dto.title}
              required
            />
          </label>

          <label className="form-control w-full max-w-xs mb-2">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              id="activity-attribute-description"
              name="description"
              placeholder="Enter Description"
              defaultValue={dto.description}
              maxLength={45}
            />
          </label>

          <label className="form-control w-full max-w-xs mb-2">
            <div className="label">
              <span className="label-text">Attribute Type</span>
            </div>
            <select
              className="select select-bordered w-2/3 max-w-xs"
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
          </label>

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
              Save Attribute Attribute changes
            </button>
          </div>
        </form>
      </WTModal>
    </div>
  );
}
