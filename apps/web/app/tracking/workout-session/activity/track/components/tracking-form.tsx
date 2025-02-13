'use client';

import { SyntheticEvent, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { ActivitySetDTO } from '@repo/dto/activity-set';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

import Modal from '../../../../../../components/modal';
import toast from 'react-hot-toast';
import { ActivityDTO } from '@repo/dto/activity';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';

function SubmitButton({ editMode }: { editMode: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" aria-disabled={pending}>
      {editMode ? 'Save' : 'Add'}
    </button>
  );
}

export function TrackingForm({
  workoutSessionId,
  activity,
  category,
  activityAttributes,
  addSessionSetAction,
}: {
  workoutSessionId: string;
  activity: ActivityDTO;
  category: ActivityCategoryDTO;
  activityAttributes: ActivityAttributeDTO[];
  addSessionSetAction: (sessionId: string, activitySet: ActivitySetDTO) => Promise<number>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(-1);
  const [attributes, setAttributes] = useState<ActivityAttributeDTO[]>([...activityAttributes]);

  const [activitySet, setActivitySet] = useState<ActivitySetDTO>({
    slug: activity.slug as string,
    title: activity.title,
    categorySlug: category.slug as string,
    categoryTitle: category.title,
    attributeSets: [],
  });

  const openModal = () => {
    setAttributes([...activityAttributes]);
    setIsModalOpen(true);
  };

  function saveTrackingAttribute(e: SyntheticEvent) {
    e.preventDefault();

    if (editIdx > -1) {
      // update existing list
      if (activitySet.attributeSets && activitySet.attributeSets[editIdx]) {
        activitySet.attributeSets[editIdx].attributes = [...attributes];
      }
      setActivitySet({ ...activitySet });
      setEditIdx(-1);
    } else {
      // add to list
      activitySet.attributeSets?.push({ attributes: [...attributes] });
      setActivitySet({ ...activitySet });
    }
    setIsModalOpen(false);
  }

  function updateTrackingAttribute(slug: string | undefined, type: string, value: string) {
    setAttributes(attributes.map((a) => (a.slug === slug ? { ...a, value, type } : a)));
  }

  function deleteTrackingAttribute(idx: number) {
    activitySet.attributeSets?.splice(idx, 1);
    setActivitySet({ ...activitySet });
  }

  function editTrackingAttribute(idx: number) {
    setEditIdx(idx);
    // set field values
    if (activitySet.attributeSets && activitySet.attributeSets[idx]) {
      if (activitySet.attributeSets[idx]?.attributes) {
        setAttributes([...activitySet.attributeSets[idx].attributes]);
        setIsModalOpen(true);
      }
    }
  }

  async function completeActivitySet() {
    const actionResult = await addSessionSetAction(workoutSessionId, activitySet);
    if (actionResult === 201) {
      // TODO: clear localStorage when feature added
    } else {
      // TODO: error message
      toast.error('Something went wrong');
    }
  }

  return (
    <div>
      <div className="mb-5">
        <button className="btn btn-primary mr-2" onClick={openModal}>
          Add Tracking
        </button>
        <button className="btn btn-primary" onClick={completeActivitySet}>
          Complete Activity
        </button>
      </div>
      <Modal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={saveTrackingAttribute}>
          {attributes.map((attribute: ActivityAttributeDTO, index: number) => (
            <div key={index} className="my-5">
              <label className="floating-label mb-2">
                <span>{attribute.title}</span>
                <input
                  type={
                    attribute.attributeType === 'TIME' || attribute.attributeType === 'STRING'
                      ? 'text'
                      : 'number'
                  }
                  placeholder={`Enter ${attribute.title}`}
                  className="input input-bordered"
                  defaultValue={attribute.value}
                  onChange={(e) =>
                    updateTrackingAttribute(attribute.slug, attribute.attributeType, e.target.value)
                  }
                />
              </label>
            </div>
          ))}
          <div className="modal-action">
            <button className="btn" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <SubmitButton editMode={editIdx > -1} />
          </div>
        </form>
      </Modal>

      <div className="flex flex-wrap">
        {activitySet?.attributeSets?.map((as, asInx) => (
          <div
            key={asInx}
            className="card card-compact border border-2 border-blue-300 m-2 basis-36 md:basis-52"
          >
            <div className="card-body capitalize">
              {as.attributes?.map((a, aInx) => (
                <div key={aInx}>
                  {a.title} {a.value}
                </div>
              ))}
              <div className="card-actions justify-end">
                <button onClick={() => editTrackingAttribute(asInx)}>
                  <PencilIcon className="size-5 text-blue-500" />
                </button>
                <button onClick={() => deleteTrackingAttribute(asInx)}>
                  <TrashIcon className="size-5 text-blue-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
