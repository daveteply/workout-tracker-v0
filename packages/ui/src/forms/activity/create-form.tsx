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
      Add Activity
    </button>
  );
}

export function ActivityCreateForm({
  createActivityAction,
  activityCategorySlug,
}: {
  createActivityAction: any;
  activityCategorySlug: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverActionResult, formAction] = useActionState(createActivityAction, initialState);

  useEffect(() => {
    if (!serverActionResult?.message) {
      setIsModalOpen(false);
    }
  }, [serverActionResult]);

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
        Add Activity
      </button>
      <WTModal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <p>Activity</p>
        <form action={formAction}>
          <input
            type="text"
            id="activity-title"
            name="title"
            placeholder="Activity Title"
            required
          />
          <input type="hidden" name="activity-category-slug" value={activityCategorySlug} />
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
