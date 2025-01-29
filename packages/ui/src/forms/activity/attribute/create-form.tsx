'use client';

import { useState } from 'react';
import WTModal from '@repo/ui/wt-modal';

export function ActivityAttributeCreateForm({
  createActivityAttributeAction,
  attributeTypes,
}: {
  createActivityAttributeAction: any;
  attributeTypes: string[];
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
    const result = await createActivityAttributeAction(null, formData);
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
        Add Activity Attribute
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
            required
          />
          <input
            className="input input-bordered w-full max-w-xs mb-5"
            type="text"
            id="activity-attribute-description"
            name="description"
            placeholder="Description"
          />
          <select
            className="select select-bordered w-1/3 max-w-xs mb-5"
            id="activity-attribute-type"
            name="attribute-type"
          >
            {attributeTypes.map((attributeType) => (
              <option key={attributeType} value={attributeType}>
                {attributeType}
              </option>
            ))}
          </select>
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
              Add Activity Attribute
            </button>
          </div>
        </form>
      </WTModal>
    </div>
  );
}
