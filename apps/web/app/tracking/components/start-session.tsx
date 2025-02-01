'use client';

export function StartSessionComponent({ startSessionAction }: { startSessionAction: any }) {
  return (
    <button className="btn btn-primary text-xs sm:text-sm capitalize" onClick={startSessionAction}>
      start a new workout session
    </button>
  );
}
