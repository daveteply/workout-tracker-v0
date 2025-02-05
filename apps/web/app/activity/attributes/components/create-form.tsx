'use client';

import { useState } from 'react';
import Modal from '../../../../components/modal';
import { ServerActionResponse } from '../../../constants';
import toast from 'react-hot-toast';

export function ActivityAttributeCreateForm({
  createActivityAttributeAction,
  attributeTypes,
}: {
  createActivityAttributeAction: (formData: FormData) => Promise<ServerActionResponse>;
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
    const result = await createActivityAttributeAction(formData);
    setIsPending(false);

    if (!result.success) {
      toast.error(result.message);
    } else {
      setIsModalOpen(false);
      toast.success('Created Activity Attribute');
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        Add Activity Attribute
      </button>
      <Modal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label className="floating-label mb-2">
            <span>Attribute Title</span>
            <input
              className="input input-bordered"
              type="text"
              id="activity-attribute-title"
              name="title"
              placeholder="Enter Attribute title"
              required
            />
          </label>

          <label className="floating-label mt-4">
            <span>Description</span>
            <textarea
              className="textarea textarea-bordered"
              id="activity-attribute-description"
              name="description"
              placeholder="Enter Description"
              maxLength={45}
            />
          </label>

          <label className="floating-label mt-4">
            <span>Attribute Type</span>
            <select
              className="select select-bordered"
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
