'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { PencilIcon } from '@heroicons/react/16/solid';

import WTModal from '@repo/ui/wt-modal';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" aria-disabled={pending}>
      Save Changes
    </button>
  );
}

export function ActivityAttributeUpdateForm({
  updateActivityAction,
  attributeTypes,
  dto,
}: {
  updateActivityAction: any;
  attributeTypes: string[];
  dto: ActivityAttributeDTO;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverActionResult, formAction] = useActionState(updateActivityAction, initialState);

  useEffect(() => {
    if (!serverActionResult?.message) {
      setIsModalOpen(false);
    }
  }, [serverActionResult]);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        <PencilIcon className="size-5 text-blue-500" />
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <p>Activity Attribute</p>
        <form action={formAction}>
          <input
            className="input input-bordered w-1/2 max-w-xs mb-5 read-only:bg-gray-100"
            type="text"
            id="activity-attribute-id"
            name="attribute-id"
            placeholder="Unique Attribute ID"
            maxLength={12}
            defaultValue={dto.attribute_id}
            required
            readOnly
          />
          <input
            className="input input-bordered w-full max-w-xs mb-5"
            type="text"
            id="activity-attribute-description"
            name="attribute-description"
            placeholder="Description"
            defaultValue={dto.description}
            maxLength={45}
          />
          <select
            className="select select-bordered w-1/3 max-w-xs mb-5"
            id="activity-attribute-type"
            name="attribute-type"
            defaultValue={dto.attribute_type}
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
