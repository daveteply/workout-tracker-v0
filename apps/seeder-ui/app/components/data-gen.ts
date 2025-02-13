import { faker } from '@faker-js/faker';
import { addDay, addHour } from '@formkit/tempo';
import { ActivityDTO } from '@repo/dto/activity';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { ActivitySetDTO } from '@repo/dto/activity-set';
import { AttributeTypes } from '@repo/dto/attribute-types';
import { WorkoutSessionDTO } from '@repo/dto/workout-session';
import { API_TRACKING_URL } from '../constants';
import {
  randStartTime,
  shuffleArray,
  advanceTime,
  multipleOfFive,
  incrementByFive,
  getActivityAttributes,
} from './utils';
import { ActivityCategoryDTO } from '@repo/dto/activity-category';

export async function generateSession(
  memberSlug: string,
  start: Date,
  totalDays: number,
  daysOfWeek: number[],
  category: ActivityCategoryDTO,
  genSetData: boolean,
  activities: ActivityDTO[],
) {
  for (let dayIndex = 0; dayIndex < totalDays; dayIndex++) {
    const targetDate = addDay(start, dayIndex);

    // {Date}.getDay() Sunday = 0, Monday = 1, ...
    if (daysOfWeek.includes(targetDate.getDay())) {
      // start time between 5 and 7 pm
      let startTime = randStartTime(addHour(targetDate, 17), addHour(targetDate, 19));

      // start Session
      const session: WorkoutSessionDTO = {
        memberSlug,
        activitySets: [],
        sessionStart: startTime,
      };

      // Activities
      activities = shuffleArray<ActivityDTO>(activities);
      if (!genSetData) {
        activities = [faker.helpers.arrayElement(activities)];
      }
      for (const activity of activities) {
        // account for set up time for Activity
        startTime = advanceTime(startTime);

        // starting mass
        let mass = multipleOfFive(5, 15);

        // start Set
        const activitySet: ActivitySetDTO = {
          slug: activity.slug as string,
          title: activity.title,
          categorySlug: category.slug as string,
          categoryTitle: category.title,
          start: startTime,
          attributeSets: [],
        };

        // Sets
        let numberOfSets = faker.helpers.rangeToNumber({ min: 2, max: 4 });
        if (!genSetData) {
          numberOfSets = 1;
        }

        for (let setIndex = 0; setIndex < numberOfSets; setIndex++) {
          const activityAttributeSet: ActivityAttributeDTO[] = [];

          // slowly, increase mass
          mass = incrementByFive(mass);

          // Activity Attributes
          const activityAttributes = await getActivityAttributes(activity.slug as string);
          for (const attribute of activityAttributes) {
            let value: string | number = 0;
            switch (attribute.attributeType) {
              case AttributeTypes.MASS:
                value = mass;
                break;
              case AttributeTypes.NUMBER:
                value = faker.helpers.rangeToNumber({ min: 6, max: 10 });
                break;
              case AttributeTypes.LENGTH:
                value = faker.helpers.rangeToNumber({ min: 10, max: 100 });
                break;
              case AttributeTypes.TIME:
                value = faker.helpers.rangeToNumber({ min: 3, max: 70 });
                break;
              case AttributeTypes.STRING:
                value = faker.word.noun();
                break;
            }

            activityAttributeSet.push({
              title: attribute.title,
              slug: attribute.slug,
              description: attribute.description,
              attributeType: attribute.attributeType,
              value: value,
            });
          }

          // account for time needed to perform Set
          startTime = advanceTime(startTime);

          activitySet.attributeSets?.push({
            attributes: activityAttributeSet,
          });
        }

        session.activitySets?.push(activitySet);
      }

      // account for time to pack up equipment, etc
      startTime = advanceTime(startTime);

      // complete session
      session.sessionCompleted = startTime;

      // push into tracking database
      await fetch(`${API_TRACKING_URL}/v1/workout-session`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(session),
      });
    }
  }
}
