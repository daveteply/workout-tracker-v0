import Link from 'next/link';

export default function Home() {
  return (
    <section>
      <h3>Welcome to Workout Tracker</h3>
      <Link className="btn btn-primary text-xs sm:text-sm capitalize" href="/tracking">
        start tracking
      </Link>
    </section>
  );
}
