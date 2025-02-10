'use server';

import { cookies } from 'next/headers';
import { MEMBER_COOKIE_KEY } from '../../constants';

export async function getCurrentMember(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(MEMBER_COOKIE_KEY)?.value;
}

export async function updateCurrentMember(memberSlug: string) {
  const cookieStore = await cookies();

  // TODO: centralize this type of rule
  const days = 2;
  const targetDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  cookieStore.set(MEMBER_COOKIE_KEY, memberSlug, { expires: targetDate });
}
