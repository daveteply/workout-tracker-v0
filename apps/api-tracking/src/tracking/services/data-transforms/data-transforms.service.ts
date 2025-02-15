import { Injectable } from '@nestjs/common';
import { ActivityAttributeDTO } from '@repo/dto/src/activity-attribute';
import { ActivityAttributeSetDTO } from '@repo/dto/src/activity-attribute-set';
import { ActivitySetDTO } from '@repo/dto/src/activity-set';
import { AttributeTypes } from '@repo/dto/src/attribute-types';
import { ActivityAttribute } from 'src/tracking/schemas/activity-attribute';
import { ActivityAttributeSet } from 'src/tracking/schemas/activity-attribute-set';
import { ActivitySet } from 'src/tracking/schemas/activity-set';

@Injectable()
export class DataTransformsService {
  attributesDTOToAttributes(attrs: ActivityAttributeDTO[]): ActivityAttribute[] {
    return (attrs ?? []).map((a) => ({
      slug: a.slug,
      title: a.title,
      type: a.attributeType,
      value: a.value,
    }));
  }

  attributesToAttributesDTO(attrs: ActivityAttribute[]): ActivityAttributeDTO[] {
    return (attrs ?? []).map((a) => ({
      slug: a.slug,
      title: a.title,
      attributeType: this.stringToEnum(a.type),
      value: a.value,
    }));
  }
  private stringToEnum(value: string): AttributeTypes {
    switch (value) {
      case 'LENGTH':
        return AttributeTypes.LENGTH;
      case 'MASS':
        return AttributeTypes.MASS;
      case 'TIME':
        return AttributeTypes.TIME;
      case 'NUMBER':
        return AttributeTypes.NUMBER;
      case 'STRING':
        return AttributeTypes.STRING;
      default:
        return AttributeTypes.LENGTH;
    }
  }

  attribSetsDTOToAttribSets(sets: ActivityAttributeSetDTO[]): ActivityAttributeSet[] {
    return (sets ?? []).map((s) => ({
      attributes: this.attributesDTOToAttributes(s.attributes),
    }));
  }

  attribSetsToAttribSetsDTO(sets: ActivityAttributeSet[]): ActivityAttributeSetDTO[] {
    return (sets ?? []).map((s) => ({
      attributes: this.attributesToAttributesDTO(s.attributes),
    }));
  }

  setsDTOToSets(sets: ActivitySetDTO[]): ActivitySet[] {
    return (sets ?? []).map((s) => ({
      activitySlug: s.slug,
      activityTitle: s.title,
      categorySlug: s.categorySlug,
      categoryTitle: s.categoryTitle,
      setStart: s.start,
      setCompleted: s.completed,
      attributeSets: this.attribSetsDTOToAttribSets(s.attributeSets as []),
    }));
  }

  setsToSetsDTO(sets: ActivitySet[]): ActivitySetDTO[] {
    debugger;
    return (sets ?? []).map((s) => ({
      slug: s.activitySlug,
      title: s.activityTitle,
      categorySlug: s.categorySlug,
      categoryTitle: s.categoryTitle,
      start: s.setStart,
      completed: s.setCompleted,
      attributeSets: this.attribSetsToAttribSetsDTO(s.attributeSets as []),
    }));
  }
}
