'use server';

import { parse, diffDays } from '@formkit/tempo';
import { API_STRUCTURE_URL } from '../constants';
import { ActivityDTO } from '@repo/dto/activity';
import { getDowIndexList } from './utils';
import { generateSetData } from './data-gen';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';

async function getCategoryActivities(activityCategorySlug: string): Promise<ActivityDTO[]> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/activities/category/${activityCategorySlug}`);
  return res.json();
}

async function getCategory(slug: string): Promise<ActivityCategoryDTO> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/categories/${slug}`);
  return res.json();
}

export async function seedFromActivityCategory(formData: FormData) {
  const activityCategorySlug = formData.get('activity-category') as string;
  const genSetData = formData.get('gen-set-data');
  const daysOfWeek = getDowIndexList(formData);

  const start = parse(formData.get('usage-start') as string);
  const complete = parse(formData.get('usage-complete') as string);
  const totalDays = Math.abs(diffDays(start, complete));

  const memberSlug = formData.get('member') as string;

  const [category, activities] = await Promise.all([
    getCategory(activityCategorySlug),
    getCategoryActivities(activityCategorySlug),
  ]);

  if (genSetData) {
    generateSetData(memberSlug, start, totalDays, daysOfWeek, category, activities);
  } else {
  }
}
