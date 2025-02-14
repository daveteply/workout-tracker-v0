import { Injectable } from '@nestjs/common';
import { ActivityAttributeDTO } from '@repo/dto/src/activity-attribute';
import { ActivityAttributeSetDTO } from '@repo/dto/src/activity-attribute-set';
import { ActivitySetDTO } from '@repo/dto/src/activity-set';
import { ActivityAttribute } from 'src/tracking/schemas/activity-attribute';
import { ActivityAttributeSet } from 'src/tracking/schemas/activity-attribute-set';
import { ActivitySet } from 'src/tracking/schemas/activity-set';

@Injectable()
export class DataTransformsService {
  attributesToAttributes(attrs: ActivityAttributeDTO[]): ActivityAttribute[] {
    return (attrs ?? []).map((a) => ({
      slug: a.slug,
      title: a.title,
      type: a.attributeType,
      value: a.value,
    }));
  }

  attribSetsToAttribSets(sets: ActivityAttributeSetDTO[]): ActivityAttributeSet[] {
    return (sets ?? []).map((s) => ({
      attributes: this.attributesToAttributes(s.attributes),
    }));
  }

  setsToSets(sets: ActivitySetDTO[]): ActivitySet[] {
    return (sets ?? []).map((s) => ({
      activitySlug: s.slug,
      activityTitle: s.title,
      categorySlug: s.categorySlug,
      categoryTitle: s.categoryTitle,
      setStart: s.start,
      setCompleted: s.completed,
      attributeSets: this.attribSetsToAttribSets(s.attributeSets as []),
    }));
  }
}
