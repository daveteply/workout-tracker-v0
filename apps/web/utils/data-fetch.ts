import { ActivityDTO } from '@repo/dto/activity';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { API_STRUCTURE_URL, API_TRACKING_URL } from '../app/constants';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';
import { WorkoutSessionDTO } from '@repo/dto/workout-session';
import { MemberDTO } from '@repo/dto/member';
import { CategoryHistoryDTO } from '@repo/dto/category-history';
import { ActivityHistoryDTO } from '@repo/dto/activity-history';

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json();
}

export async function getActivity(slug: string): Promise<ActivityDTO> {
  return fetchJSON<ActivityDTO>(`${API_STRUCTURE_URL}/v1/activities/${slug}`);
}

export async function getActivityAttributes(slug: string): Promise<ActivityAttributeDTO[]> {
  return fetchJSON<ActivityAttributeDTO[]>(
    `${API_STRUCTURE_URL}/v1/activity-attributes/activity/${slug}`,
  );
}

export async function getAttributeTypes(): Promise<string[]> {
  return fetchJSON<string[]>(`${API_STRUCTURE_URL}/v1/attributes/types`);
}

export async function getAttributes(): Promise<ActivityAttributeDTO[]> {
  return fetchJSON<ActivityAttributeDTO[]>(`${API_STRUCTURE_URL}/v1/attributes`);
}

export async function getCategory(slug: string): Promise<ActivityCategoryDTO> {
  return fetchJSON<ActivityCategoryDTO>(`${API_STRUCTURE_URL}/v1/categories/${slug}`);
}

export async function getCategories(): Promise<ActivityCategoryDTO[]> {
  return fetchJSON<ActivityCategoryDTO[]>(`${API_STRUCTURE_URL}/v1/categories`);
}

export async function getCategoryActivities(activityCategorySlug: string): Promise<ActivityDTO[]> {
  return fetchJSON<ActivityDTO[]>(
    `${API_STRUCTURE_URL}/v1/activities/category/${activityCategorySlug}`,
  );
}

// Tracking

export async function getSessions(memberSlug?: string): Promise<WorkoutSessionDTO[]> {
  return fetchJSON<WorkoutSessionDTO[]>(`${API_TRACKING_URL}/v1/workout-session/${memberSlug}`);
}

async function fetchHistory<T>(
  type: 'category' | 'activity',
  memberSlug: string,
  limit: number,
): Promise<T[]> {
  return fetchJSON<T[]>(
    `${API_TRACKING_URL}/v1/workout-session/${memberSlug}/${type}-history?l=${limit}`,
  );
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
  return fetchJSON<MemberDTO[]>(`${API_STRUCTURE_URL}/v1/members`);
}
