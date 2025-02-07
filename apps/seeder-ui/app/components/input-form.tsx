'use client';

import { ActivityCategoryDTO } from '@repo/dto/activity-category';
import { useState } from 'react';
import { addMonth, addYear } from '@formkit/tempo';

export function InputForm({
  activityCategories,
  seedServerAction,
}: {
  activityCategories: ActivityCategoryDTO[];
  seedServerAction: (formData: FormData) => Promise<void>;
}) {
  const [isPending, setIsPending] = useState(false);

  const startDate = addMonth(new Date(), -4);
  const endDate = new Date();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    await seedServerAction(formData);
    setIsPending(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Category</span>
          <select id="activity-category" name="activity-category">
            {activityCategories.map((ac) => (
              <option key={ac.slug} value={ac.slug}>
                {ac.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Usage Start</span>
          <input
            type="date"
            id="usage-start"
            name="usage-start"
            defaultValue={startDate.toISOString().substring(0, 10)}
          ></input>
        </label>

        <label>
          <span>Usage Completed</span>
          <input
            type="date"
            id="usage-complete"
            name="usage-complete"
            defaultValue={endDate.toISOString().substring(0, 10)}
          ></input>
        </label>

        <label>
          <span>Generate Set-Based Data</span>
          <input type="checkbox" id="gen-set-data" name="gen-set-data" defaultChecked></input>
        </label>

        <button type="submit" disabled={isPending}>
          Generate Seed Data
        </button>
      </form>
    </div>
  );
}
