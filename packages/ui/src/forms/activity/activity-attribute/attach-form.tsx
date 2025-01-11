'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import WTModal from '@repo/ui/wt-modal';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" aria-disabled={pending}>
      Attach Attribute
    </button>
  );
}

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
  const [serverActionResult, formAction] = useActionState(
    createActivityAttributesAction,
    initialState,
  );

  const openModal = () => {
    initialState.message = '';
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!serverActionResult?.message) {
      setIsModalOpen(false);
    }
  }, [serverActionResult]);

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        Attach Attribute to Activity
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <p>Activity Attribute</p>
        <form action={formAction}>
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
            <SubmitButton />
          </div>
        </form>
      </WTModal>
    </div>
  );
}
