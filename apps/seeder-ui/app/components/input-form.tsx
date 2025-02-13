'use client';

import { ActivityCategoryDTO } from '@repo/dto/activity-category';
import { useState } from 'react';
import { addMonth } from '@formkit/tempo';
import { MemberDTO } from '@repo/dto/member';
import { DOW } from '../constants';

export function InputForm({
  activityCategories,
  members,
  seedServerAction,
}: {
  activityCategories: ActivityCategoryDTO[];
  members: MemberDTO[];
  seedServerAction: (formData: FormData) => Promise<void>;
}) {
  const [isPending, setIsPending] = useState(false);

  const startDate = addMonth(new Date(), -4);
  const endDate = new Date();

  const dowList = Object.values(DOW).filter((value) => typeof value === 'string');
  const [selectedDow, setDow] = useState(new Array(dowList.length).fill(false));

  const handleDowChange = (index: number) => {
    const updatedState = selectedDow.map((d, i) => (index === i ? !d : d));
    setDow(updatedState);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);

    selectedDow.forEach((d, index) => {
      formData.append(dowList[index], d + '');
    });

    await seedServerAction(formData);
    setIsPending(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Member</span>
          <select id="member" name="member">
            {members.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name}
              </option>
            ))}
          </select>
        </label>

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
          <span>Days of Week</span>
          <div className="dow-group">
            {dowList.map((d, index) => (
              <label key={index}>
                {d}
                <input
                  type="checkbox"
                  id={d}
                  value={d}
                  checked={selectedDow[index]}
                  onChange={() => handleDowChange(index)}
                />
              </label>
            ))}
          </div>
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
