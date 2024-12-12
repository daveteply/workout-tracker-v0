'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Modal from '@repo/ui/modal';

const initialState = {
  message: '',
};

interface ActivityCategoryUpsertFormProps {
  createActivityCategoryAction: any;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-primary" type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

export function ActivityCategoryUpsertForm({
  createActivityCategoryAction,
}: ActivityCategoryUpsertFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [state, formAction] = useActionState(
    createActivityCategoryAction,
    initialState
  );

  return (
    <div>
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Add Activity Category
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form action={formAction}>
          <h2>Modal Content</h2>
          <input
            type="text"
            id="activity-category-title"
            name="title"
            required
          />
          <SubmitButton />
          <p>{state.message}</p>
        </form>
      </Modal>
    </div>
  );
}
