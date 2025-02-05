'use client';

import { useState } from 'react';
import Modal from '../../../../../components/modal';
import { ServerActionResponse } from '../../../../constants';
import toast from 'react-hot-toast';

export function ActivityCreateForm({
  createActivityAction,
  activityCategorySlug,
}: {
  createActivityAction: (formData: FormData) => Promise<ServerActionResponse>;
  activityCategorySlug: string;
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
    const result = await createActivityAction(formData);
    setIsPending(false);

    if (!result.success) {
      toast.error(result.message);
    } else {
      setIsModalOpen(false);
      toast.success('Created Activity');
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        Add Activity
      </button>
      <Modal isOpen={isModalOpen} hideClose={true} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label className="floating-label mb-2">
            <span>Activity Title</span>
            <input
              className="input input-bordered"
              type="text"
              id="activity-title"
              name="title"
              placeholder="Enter Activity Title"
              required
            />
          </label>

          <label className="floating-label mt-4">
            <span>Description</span>
            <textarea
              className="textarea textarea-bordered"
              id="activity-description"
              name="description"
              rows={3}
              placeholder="Describe this Activity"
            />
          </label>

          <input type="hidden" name="category-slug" value={activityCategorySlug} />

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
              Add Activity
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
