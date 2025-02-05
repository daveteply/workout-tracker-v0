'use client';

import { MouseEventHandler } from 'react';

export function CreateSessionComponent({
  createSessionAction,
}: {
  createSessionAction: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className="btn btn-primary text-xs sm:text-sm capitalize" onClick={createSessionAction}>
      start a new workout session
    </button>
  );
}
