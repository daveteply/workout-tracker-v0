'use client';

import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { useFormStatus } from 'react-dom';
import { SyntheticEvent, useState } from 'react';
import WTModal from '@repo/ui/wt-modal';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" aria-disabled={pending}>
      Track
    </button>
  );
}

export function TrackingForm({
  activityAttributes,
}: {
  activityAttributes: ActivityAttributeDTO[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attributes, setAttributes] = useState<ActivityAttributeDTO[]>([...activityAttributes]);
  const [attributeSet, setAttributeSet] = useState<ActivityAttributeDTO[][]>([]);

  const openModal = () => {
    initialState.message = '';
    setIsModalOpen(true);
  };

  function addTrackingAttribute(e: SyntheticEvent) {
    e.preventDefault();
    setAttributeSet([...attributeSet, attributes]);
    setIsModalOpen(false);
  }

  function handleChange(slug: string, value: string) {
    setAttributes(attributes.map((a) => (a.slug === slug ? { ...a, attributeValue: value } : a)));
  }

  return (
    <div>
      <div className="mb-5">
        <button className="btn btn-primary mr-2" onClick={openModal}>
          Add Tracking
        </button>
        <button className="btn btn-primary">Complete Activity</button>
      </div>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={addTrackingAttribute}>
          {attributes.map((attribute: ActivityAttributeDTO, index: number) => (
            <div key={index} className="my-5">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">{attribute.title}</span>
                </div>
                <input
                  type={
                    attribute.attributeType === 'TIME' || attribute.attributeType === 'STRING'
                      ? 'text'
                      : 'number'
                  }
                  placeholder="Enter value"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => handleChange(attribute.slug, e.target.value)}
                />
              </label>
            </div>
          ))}
          <div className="modal-action">
            <button className="btn" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <SubmitButton />
          </div>
        </form>
      </WTModal>

      <div className="flex flex-wrap">
        {attributeSet.map((a, aInx) => (
          <div
            key={aInx}
            className="card card-compact border border-2 border-blue-300 m-2 basis-36 md:basis-52"
          >
            <div className="card-body capitalize">
              {a.map((s, sInx) => (
                <div key={sInx}>
                  {s.title} {s.attributeValue}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
