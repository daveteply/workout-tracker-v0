'use client';

import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { NumberCaptureForm } from './attribute-forms/number-capture-form.js';
import { useFormStatus } from 'react-dom';
import { SyntheticEvent } from 'react';
import { StringCaptureForm } from './attribute-forms/string-capture-form.js';

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
  function trackActivityData(e: SyntheticEvent) {
    e.preventDefault();
    console.log('event', e.target);
  }

  function handleAddSet() {
    console.log('TODO: handle add set');
  }

  function attributeFormFactory(attribute: ActivityAttributeDTO) {
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
      <button className="btn btn-primary" onClick={handleAddSet}>
        Start a New Set
      </button>
      <form onSubmit={trackActivityData}>
        {activityAttributes.map((attribute, index) => (
          <div key={index} className="my-5">
            {attributeFormFactory(attribute)}
          </div>
        ))}
        <SubmitButton />
      </form>
    </div>
  );
}
