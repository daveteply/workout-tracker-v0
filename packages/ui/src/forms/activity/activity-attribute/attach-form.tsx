'use client';

import { useState } from 'react';
import WTModal from '@repo/ui/wt-modal';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';

export function ActivityAttributesAttachForm({
  createActivityAttributesAction,
  attributes,
  activitySlug,
}: {
  createActivityAttributesAction: any;
  attributes: ActivityAttributeDTO[];
  activitySlug: string;
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
    const result = await createActivityAttributesAction(null, formData);
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
        Attach Attribute to Activity
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <p>Activity Attribute</p>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="activity-slug" value={activitySlug} />
          <select
            className="select select-bordered w-1/3 max-w-xs mb-5 w-full"
            id="activity-attribute-type"
            name="attribute-slug"
          >
            {attributes.map((attribute) => (
              <option key={attribute.slug} value={attribute.slug}>
                {attribute.title} ({attribute.attributeType})
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
              Attach Attribute
            </button>
          </div>
        </form>
      </WTModal>
    </div>
  );
}
