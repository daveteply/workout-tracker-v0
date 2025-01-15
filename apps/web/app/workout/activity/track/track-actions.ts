'use server';

import { z } from 'zod';

export async function trackActivity(prevState: { message: string }, formData: FormData) {
  const valueName = 'attribute-value';
  const slugName = 'attribute-slug';
  const typeName = 'attribute-type';

  const valueValue = formData.get(valueName);
  const slugValue = formData.get(slugName);
  const typeValue = formData.get(typeName);

  if (valueName.length) {
    // tracking multiple
  } else {
  }

  // const attributeValue =

  const schema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    activityCategorySlug: z.string(),
  });
}
