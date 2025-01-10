import { AttributeType } from '@prisma/client';

export interface AttributeDO {
  slug?: string;
  title: string;
  description?: string;
  attributeType: AttributeType;
}
