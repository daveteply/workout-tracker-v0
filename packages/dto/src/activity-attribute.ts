import { AttributeTypes } from './attribute-types.js';

export interface ActivityAttributeDTO {
  slug?: string;
  title: string;
  description: string;
  attributeType: AttributeTypes;
  value?: string | number;
}
