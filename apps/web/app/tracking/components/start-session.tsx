'use client';

export function CreateSessionComponent({
  createSessionAction,
  memberSlug,
}: {
  createSessionAction: (memberSlug: string | undefined) => Promise<void>;
  memberSlug: string | undefined;
}) {
  return (
    <button className="btn btn-primary capitalize" onClick={() => createSessionAction(memberSlug)}>
      start a new workout session
    </button>
  );
}
