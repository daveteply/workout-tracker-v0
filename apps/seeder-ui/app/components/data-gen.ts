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

export async function generateSetData(
  memberSlug: string,
  start: Date,
  totalDays: number,
  daysOfWeek: number[],
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

      // start Session
      if (!session.sessionStart) {
        session.sessionStart = startTime;
      }

      // Activities
      activities = shuffleArray<ActivityDTO>(activities);
      for (const activity of activities) {
        // account for set up time for Activity
        startTime = advanceTime(startTime);

        // starting mass
        let mass = multipleOfFive(5, 15);

        // start Set
        const activitySet: ActivitySetDTO = {
          slug: activity.slug as string,
          title: activity.title,
          start: startTime,
          attributeSets: [],
        };

        // Sets
        const numberOfSets = faker.helpers.rangeToNumber({ min: 2, max: 4 });

        for (let setIndex = 0; setIndex < numberOfSets; setIndex++) {
          const activityAttributeSet: ActivityAttributeDTO[] = [];

          // slowly, increase mass
          mass = incrementByFive(mass);

          // Activity Attributes
          const activityAttributes = await getActivityAttributes(activity.slug as string);
          for (const attribute of activityAttributes) {
            switch (attribute.attributeType) {
              case AttributeTypes.MASS:
                activityAttributeSet.push({
                  title: attribute.title,
                  slug: attribute.slug,
                  description: attribute.description,
                  attributeType: attribute.attributeType,
                  value: mass,
                });
                break;
              case AttributeTypes.NUMBER:
                activityAttributeSet.push({
                  title: attribute.title,
                  slug: attribute.slug,
                  description: attribute.description,
                  attributeType: attribute.attributeType,
                  value: faker.helpers.rangeToNumber({ min: 6, max: 10 }),
                });
                break;
              case AttributeTypes.LENGTH:
                // TODO
                break;
              case AttributeTypes.TIME:
                // TODO
                break;
              case AttributeTypes.STRING:
                // TODO
                break;
            }
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
