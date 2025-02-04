import { API_STRUCTURE_URL } from './constants';
import { InputForm } from './components/input-form';
import { seedFromActivityCategory } from './components/seed-action';

export default async function HomePage() {
  const result = await fetch(`${API_STRUCTURE_URL}/v1/categories`);
  const categories = await result.json();

  return (
    <main>
      <h1>Database Seeder</h1>
      <p>
        This app is intended to be used during development only to seed data into the Tracker
        database to simulate usage of the Workout Tracker over time.
      </p>
      <InputForm activityCategories={categories} seedServerAction={seedFromActivityCategory} />
    </main>
  );
}
