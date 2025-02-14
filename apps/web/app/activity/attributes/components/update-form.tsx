'use client';

import { useState, useCallback } from 'react';
import { PencilIcon } from '@heroicons/react/16/solid';

import Modal from '../../../../components/modal';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { ServerActionResponse } from '../../../constants';
import toast from 'react-hot-toast';

export function ActivityAttributeUpdateForm({
  updateActivityAttributeAction,
  attributeTypes,
  dto,
}: {
  updateActivityAttributeAction: (formData: FormData) => Promise<ServerActionResponse>;
  attributeTypes: string[];
  dto: ActivityAttributeDTO;
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
      const result = await updateActivityAttributeAction(formData);
      setIsPending(false);

      if (!result.success) {
        toast.error(result.message);
      } else {
        closeModal();
        toast.success('Updated Activity Attribute');
      }
    },
    [updateActivityAttributeAction, closeModal],
  );

  return (
    <div>
      <button className="btn btn-sm" onClick={openModal}>
        <PencilIcon className="size-5 text-blue-500" />
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
              defaultValue={dto.title}
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
              defaultValue={dto.description}
              maxLength={45}
            />
          </label>

          <label className="floating-label mt-4">
            <span>Attribute Type</span>
            <select
              className="select select-bordered"
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
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isPending}
              aria-disabled={isPending}
            >
              Save Activity Attribute
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
