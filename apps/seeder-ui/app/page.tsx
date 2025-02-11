import { API_STRUCTURE_URL } from './constants';
import { InputForm } from './components/input-form';
import { seedFromActivityCategory } from './components/seed-action';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';
import { MemberDTO } from '@repo/dto/member';

async function getCategories(): Promise<ActivityCategoryDTO[]> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/categories`);
  return res.json();
}

async function getMembers(): Promise<MemberDTO[]> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/members`);
  return res.json();
}

export default async function HomePage() {
  const [members, categories] = await Promise.all([getMembers(), getCategories()]);

  return (
    <main>
      <h1>Database Seeder</h1>
      <p>
        This app is intended to be used during development only to seed data into the Tracker
        database to simulate usage of the Workout Tracker over time.
      </p>
      <InputForm
        activityCategories={categories}
        seedServerAction={seedFromActivityCategory}
        members={members}
      />
    </main>
  );
}
