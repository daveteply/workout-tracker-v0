import Link from 'next/link';
export default function HomePage() {
  return (
    <section>
      <h3>Welcome to Workout Tracker</h3>
      <p>This is an app to help you track your workouts and track progress towards goals!</p>
      <Link className="btn btn-primary text-primary-content no-underline" href={'/tracking'}>
        Start or Continue your Workout
      </Link>
    </section>
  );
}
