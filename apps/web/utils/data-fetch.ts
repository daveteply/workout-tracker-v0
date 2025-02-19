import { ActivityDTO } from '@repo/dto/activity';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import {
  API_STRUCTURE_URL,
  API_TRACKING_URL,
  ITEMS_PER_PAGE,
  SESSION_HISTORY_LIMIT,
} from '../app/constants';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';
import { WorkoutSessionDTO } from '@repo/dto/workout-session';
import { MemberDTO } from '@repo/dto/member';
import { CategoryHistoryDTO } from '@repo/dto/category-history';
import { ActivityHistoryDTO } from '@repo/dto/activity-history';
import { ActivitySetDTO } from '@repo/dto/activity-set';

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

export async function getSessions(
  memberSlug?: string,
  itemsPerPage: number = ITEMS_PER_PAGE,
  pageNumber: number = 1,
): Promise<WorkoutSessionDTO[]> {
  if (!memberSlug) return [];

  const url = new URL(`/v1/workout-session/${memberSlug}`, API_TRACKING_URL);
  url.searchParams.set('pc', itemsPerPage.toString());
  url.searchParams.set('pn', pageNumber.toString());

  return fetchJSON<WorkoutSessionDTO[]>(url.toString());
}

export async function getSessionCount(memberSlug?: string): Promise<number> {
  if (!memberSlug) return 0;

  const url = new URL(`/v1/workout-session/${memberSlug}/count`, API_TRACKING_URL);
  return fetchJSON<number>(url.toString());
}

async function fetchHistory<T>(
  type: 'category' | 'activity',
  memberSlug?: string,
  limit: number = SESSION_HISTORY_LIMIT,
): Promise<T[]> {
  if (!memberSlug) return [];

  const url = new URL(`/v1/workout-session/${memberSlug}/${type}-history`, API_TRACKING_URL);
  url.searchParams.set('l', limit.toString());

  return fetchJSON<T[]>(url.toString());
}

export function getSessionCategoryHistory(
  memberSlug?: string,
  limit: number = SESSION_HISTORY_LIMIT,
): Promise<CategoryHistoryDTO[]> {
  return fetchHistory<CategoryHistoryDTO>('category', memberSlug, limit);
}

export function getSessionActivityHistory(
  memberSlug?: string,
  limit: number = SESSION_HISTORY_LIMIT,
): Promise<ActivityHistoryDTO[]> {
  return fetchHistory<ActivityHistoryDTO>('activity', memberSlug, limit);
}

/** This method intentionally returns a single result */
export async function getSessionActivityAttributeHistory(
  memberSlug?: string,
  activitySlug?: string,
  limit: number = 1,
): Promise<ActivitySetDTO[]> {
  if (!memberSlug) return [];
  if (!activitySlug) return [];

  const url = new URL(
    `/v1/workout-session/${memberSlug}/activity-history/${activitySlug}/attributes`,
    API_TRACKING_URL,
  );
  url.searchParams.set('l', limit.toString());

  const res = await fetch(url.toString());
  return res.json();
}

// Member

export async function getMembers(): Promise<MemberDTO[]> {
  return fetchJSON<MemberDTO[]>(`${API_STRUCTURE_URL}/v1/members`);
}
