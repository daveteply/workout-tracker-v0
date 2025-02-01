'use client';

import { useState } from 'react';
import Modal from '../../../../components/modal';

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
      <Modal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
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
            >
              {attributeTypes.map((attributeType) => (
                <option key={attributeType} value={attributeType}>
                  {attributeType}
                </option>
              ))}
            </select>
          </label>

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
      </Modal>
    </div>
  );
}
