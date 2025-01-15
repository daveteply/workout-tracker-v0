'use client';

import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { NumberCaptureForm } from './attribute-forms/number-capture-form.js';
import { useFormStatus } from 'react-dom';
import { SyntheticEvent, useState } from 'react';
import { StringCaptureForm } from './attribute-forms/string-capture-form.js';
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

  const openModal = () => {
    initialState.message = '';
    setIsModalOpen(true);
  };

  function trackActivityData(e: SyntheticEvent) {
    e.preventDefault();
    // console.log('event', e.target);
  }

  function attributeFormFactory(attribute: ActivityAttributeDTO) {
    // TODO: convert to use enum
    switch (attribute.attributeType) {
      case 'LENGTH':
      case 'MASS':
      case 'NUMBER':
        return <NumberCaptureForm attribute={attribute} />;

      case 'TIME':
      case 'STRING':
        return <StringCaptureForm attribute={attribute} />;

      default:
        console.error('Missing Attribute Type:', attribute);
    }
  }

  return (
    <div>
      <button className="btn btn-primary mr-2" onClick={openModal}>
        Add Tracking
      </button>
      <button className="btn btn-primary">Complete Activity</button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={trackActivityData}>
          {activityAttributes.map((attribute, index) => (
            <div key={index} className="my-5">
              {attributeFormFactory(attribute)}
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
    </div>
  );
}
