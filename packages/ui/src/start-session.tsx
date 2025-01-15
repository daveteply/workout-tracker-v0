'use client';

//import { useRouter } from 'next/navigation';

export function StartSessionComponent({ startSessionAction }: { startSessionAction: any }) {
  // const router = useRouter();

  // router.push('/workout');
  //}

  return (
    <button className="btn btn-primary text-xs sm:text-sm capitalize" onClick={startSessionAction}>
      start a new workout session
    </button>
  );
}
