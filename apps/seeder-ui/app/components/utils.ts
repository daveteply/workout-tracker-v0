import { addMinute } from '@formkit/tempo';
import { faker } from '@faker-js/faker';
import { API_STRUCTURE_URL, DOW } from '../constants';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';

export async function getActivityAttributes(activitySlug: string): Promise<ActivityAttributeDTO[]> {
  const res = await fetch(`${API_STRUCTURE_URL}/v1/activity-attributes/activity/${activitySlug}`);
  return res.json();
}

export function randStartTime(startTime: Date, endTime: Date): Date {
  const startMs = startTime.getTime();
  const endMs = endTime.getTime();
  const randomMs = Math.random() * (endMs - startMs) + startMs;
  return new Date(randomMs);
}

export function advanceTime(targetDate: Date): Date {
  return addMinute(targetDate, faker.helpers.rangeToNumber({ min: 2, max: 5 }));
}

export function multipleOfFive(min: number, max: number): number {
  // Ensure the range is valid for the multiple
  const multiple = 5;
  if (min % multiple !== 0) {
    min = Math.ceil(min / multiple) * multiple;
  }
  if (max % multiple !== 0) {
    max = Math.floor(max / multiple) * multiple;
  }
  const range = (max - min) / multiple + 1;
  return Math.floor(Math.random() * range) * multiple + min;
}

export function incrementByFive(target: number): number {
  return target + multipleOfFive(0, 5);
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getDowIndexList(formData: FormData): number[] {
  const list: number[] = [];

  const dowList = Object.values(DOW).filter((value) => typeof value === 'string');
  dowList.forEach((d, inx) => {
    if (formData.get(d) === 'true') {
      list.push(inx);
    }
  });

  return list;
}
