import { ActivityDTO } from '@repo/dto/activity';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { API_STRUCTURE_URL } from '../app/constants';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';

export async function getActivity(slug: string): Promise<ActivityDTO> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/activities/${slug}`);
  return res.json();
}

export async function getActivityAttributes(slug: string): Promise<ActivityAttributeDTO[]> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/activity-attributes/activity/${slug}`);
  return res.json();
}

export async function getAttributeTypes(): Promise<string[]> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/attributes/types`);
  return res.json();
}

export async function getAttributes(): Promise<ActivityAttributeDTO[]> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/attributes`);
  return res.json();
}

export async function getCategory(slug: string): Promise<ActivityCategoryDTO> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/categories/${slug}`);
  return res.json();
}

export async function getCategories(): Promise<ActivityCategoryDTO[]> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/categories`);
  return res.json();
}

export async function getCategoryActivities(activityCategorySlug: string): Promise<ActivityDTO[]> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/activities/category/${activityCategorySlug}`);
  return res.json();
}
