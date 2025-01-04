'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import WTModal from '@repo/ui/wt-modal';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" aria-disabled={pending}>
      Add Activity Attribute
    </button>
  );
}

export function ActivityAttributeCreateForm({
  createActivityAttributeAction,
  attributeTypes,
}: {
  createActivityAttributeAction: any;
  attributeTypes: string[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverActionResult, formAction] = useActionState(
    createActivityAttributeAction,
    initialState,
  );

  useEffect(() => {
    if (!serverActionResult?.message) {
      setIsModalOpen(false);
    }
  }, [serverActionResult]);

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
        Add Activity Attribute
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <p>Activity Attribute</p>
        <form action={formAction}>
          <input
            className="input input-bordered w-1/2 max-w-xs mb-5"
            type="text"
            id="activity-attribute-id"
            name="attribute-id"
            placeholder="Attribute ID"
            maxLength={12}
            required
          />
          <input
            className="input input-bordered w-full max-w-xs mb-5"
            type="text"
            id="activity-attribute-description"
            name="attribute-description"
            placeholder="Description"
            maxLength={45}
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
            <SubmitButton />
          </div>
        </form>
      </WTModal>
    </div>
  );
}
