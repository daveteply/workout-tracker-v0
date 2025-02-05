'use server';

import { parse, diffDays, addDay, addHour } from '@formkit/tempo';
import { API_STRUCTURE_URL, API_TRACKING_URL } from '../constants';
import { faker } from '@faker-js/faker';
import { WorkoutSessionDTO } from '@repo/dto/workout-session';
import { ActivitySetDTO } from '@repo/dto/activity-set';
import { ActivityDTO } from '@repo/dto/activity';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { AttributeTypes } from '@repo/dto/attribute-types';
import { advanceTime, incrementByFive, multipleOfFive, randStartTime, shuffleArray } from './utils';

async function getActivityAttributes(activitySlug: string): Promise<ActivityAttributeDTO[]> {
  const response = await fetch(
    `${API_STRUCTURE_URL}/v1/activity-attributes/activity/${activitySlug}`,
  );
  return await response.json();
}

export async function seedFromActivityCategory(formData: FormData) {
  const activityCategorySlug = formData.get('activity-category');
  const genSetData = formData.get('gen-set-data');

  const start = parse(formData.get('usage-start') as string);
  const complete = parse(formData.get('usage-complete') as string);
  const days = Math.abs(diffDays(start, complete));

  // get category activities
  const activityResult = await fetch(
    `${API_STRUCTURE_URL}/v1/activities/category/${activityCategorySlug}`,
  );
  let activities = await activityResult.json();

  if (genSetData) {
    // Generate Style 1: Generate data based on a Mon, Tues, Wed routine
    // TODO: explore other patterns of mocking data
    for (let dayIndex = 0; dayIndex < days; dayIndex++) {
      const targetDate = addDay(start, dayIndex);
      const monWedFri = [1, 3, 5]; //getDay() Sunday = 0, Monday = 1, ...

      if (monWedFri.includes(targetDate.getDay())) {
        // start time between 5 and 7 pm
        let startTime = randStartTime(addHour(targetDate, 17), addHour(targetDate, 19));

        // start Session
        const session: WorkoutSessionDTO = {
          // TODO: expand UI to allow member selection
          memberId: 1,
          activitySets: [],
          sessionStart: startTime,
        };

        // start Session
        if (!session.sessionStart) {
          session.sessionStart = startTime;
        }

        // Activities
        activities = shuffleArray<ActivityDTO>(activities);
        debugger;
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
  } else {
    //TODO
  }
}
