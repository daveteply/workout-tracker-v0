import { ActivityDTO } from '@repo/dto/activity';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { API_STRUCTURE_URL, API_TRACKING_URL } from '../app/constants';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';
import { WorkoutSessionDTO } from '@repo/dto/workout-session';
import { MemberDTO } from '@repo/dto/member';
import { CategoryHistoryDTO } from '@repo/dto/category-history';
import { ActivityHistoryDTO } from '@repo/dto/activity-history';

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

// Tracking

export async function getSessions(memberSlug?: string): Promise<WorkoutSessionDTO[]> {
  const res = await fetch(`${API_TRACKING_URL}/v1/workout-session/${memberSlug}`);
  return res.json();
}

async function fetchHistory<T>(
  type: 'category' | 'activity',
  memberSlug: string,
  limit: number,
): Promise<T[]> {
  const res = await fetch(
    `${API_TRACKING_URL}/v1/workout-session/${memberSlug}/${type}-history?l=${limit}`,
  );
  return res.json();
}

export function getSessionCategoryHistory(
  memberSlug: string,
  limit: number,
): Promise<CategoryHistoryDTO[]> {
  return fetchHistory<CategoryHistoryDTO>('category', memberSlug, limit);
}

export function getSessionActivityHistory(
  memberSlug: string,
  limit: number,
): Promise<ActivityHistoryDTO[]> {
  return fetchHistory<ActivityHistoryDTO>('activity', memberSlug, limit);
}

// Member
export async function getMembers(): Promise<MemberDTO[]> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/members`);
  return res.json();
}
