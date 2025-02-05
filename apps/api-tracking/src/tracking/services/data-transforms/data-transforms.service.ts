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
    const attributes: ActivityAttribute[] = [];
    if (attrs?.length) {
      attrs.forEach((a) => {
        attributes.push({
          slug: a.slug,
          title: a.title,
          description: a.description,
          type: a.attributeType,
          value: a.value,
        });
      });
    }
    return attributes;
  }

  attribSetsToAttribSets(sets: ActivityAttributeSetDTO[]): ActivityAttributeSet[] {
    const attribSets: ActivityAttributeSet[] = [];
    if (sets?.length) {
      sets.forEach((s) => {
        attribSets.push({ attributes: [...this.attributesToAttributes(s.attributes)] });
      });
    }
    return attribSets;
  }

  setsToSets(sets: ActivitySetDTO[]): ActivitySet[] {
    const activitySets: ActivitySet[] = [];
    if (sets?.length) {
      sets.forEach((s) => {
        activitySets.push({
          activitySlug: s.slug,
          activityTitle: s.title,
          setStart: s.start,
          setCompleted: s.completed,
          attributeSets: this.attribSetsToAttribSets(s.attributeSets as []),
        });
      });
    }
    return activitySets;
  }
}
