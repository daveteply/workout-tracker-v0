'use client';

import { useState, useCallback } from 'react';
import Modal from '../../../../../../components/modal';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { ServerActionResponse } from '../../../../../constants';
import toast from 'react-hot-toast';

export function ActivityAttributesAttachForm({
  createActivityAttributesAction,
  attributes,
  activitySlug,
}: {
  createActivityAttributesAction: (formData: FormData) => Promise<ServerActionResponse>;
  attributes: ActivityAttributeDTO[];
  activitySlug: string;
}) {
  const [isPending, setIsPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsPending(true);
      const formData = new FormData(event.currentTarget);
      const result = await createActivityAttributesAction(formData);
      setIsPending(false);

      if (!result.success && result.message) {
        toast.error(result.message);
      } else {
        closeModal();
        toast.success('Attached Attribute');
      }
    },
    [createActivityAttributesAction, closeModal],
  );

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        Attach Attribute to Activity
      </button>
      <Modal isOpen={isModalOpen} hideClose onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <label className="floating-label mt-4">
            <span>Attribute</span>
            <select
              className="select select-bordered"
              id="activity-attribute-type"
              name="attribute-slug"
            >
              {attributes.map((attribute) => (
                <option key={attribute.slug} value={attribute.slug}>
                  {attribute.title} - {attribute.attributeType}
                </option>
              ))}
            </select>
          </label>

          <input type="hidden" name="activity-slug" value={activitySlug} />

          <div className="modal-action">
            <button className="btn" type="button" onClick={closeModal}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isPending}
              aria-disabled={isPending}
            >
              Attach Attribute
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
