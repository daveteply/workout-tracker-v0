'use client';

import { WorkoutSessionDTO } from '@repo/dto/workout-session';

export function ContinueWorkoutSession({
  workoutSessions,
}: {
  workoutSessions: WorkoutSessionDTO[];
}) {
  return (
    <div>
      {workoutSessions.map((w) => (
        <div key={w.Id} className="flex mb-3">
          <button className="btn text-xs sm:text-sm capitalize">Continue Session</button>
          <div>{w.SessionStart.toString()}</div>
          <div>{w.Id}</div>
        </div>
      ))}
    </div>
  );
}
