'use server';

import { parse, diffDays, addDay, addHour, addMinute } from '@formkit/tempo';
import { API_STRUCTURE_URL } from '../constants';
import { faker } from '@faker-js/faker';
import { WorkoutSessionDTO } from '@repo/dto/workout-session';
import { ActivitySetDTO } from '@repo/dto/activity-set';
import { ActivityDTO } from '@repo/dto/activity';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { AttributeTypes } from '@repo/dto/attribute-types';

function randStartTime(startTime: Date, endTime: Date): Date {
  const startMs = startTime.getTime();
  const endMs = endTime.getTime();
  const randomMs = Math.random() * (endMs - startMs) + startMs;
  return new Date(randomMs);
}

function advanceTime(targetDate: Date): Date {
  return addMinute(targetDate, faker.helpers.rangeToNumber({ min: 2, max: 5 }));
}

function multipleOfFive(min: number, max: number): number {
  // Ensure the range is valid for the multiple
  const multiple = 5;
  if (min % multiple !== 0) {
    min = Math.ceil(min / multiple) * multiple;
  }
  if (max % multiple !== 0) {
    max = Math.floor(max / multiple) * multiple;
  }
  const range = (max - min) / multiple + 1;
  return Math.floor(Math.random() * range) * multiple + min;
}
function incrementByFive(target: number): number {
  return target + multipleOfFive(0, 5);
}

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

  // start Session
  const session: WorkoutSessionDTO = {
    // TODO: expand UI to allow member selection
    memberId: 1,
    activitySets: [],
  };

  // get category activities
  const activityResult = await fetch(
    `${API_STRUCTURE_URL}/v1/activities/category/${activityCategorySlug}`,
  );
  const activities = await activityResult.json();

  if (genSetData) {
    // Generate Style 1: Generate data based on a Mon, Tues, Wed routine
    for (let dayIndex = 0; dayIndex < days; dayIndex++) {
      const targetDate = addDay(start, dayIndex);
      const monWedFri = [1, 3, 5]; //getDay() Sunday = 0, Monday = 1, ...

      if (monWedFri.includes(targetDate.getDay())) {
        debugger;

        // start time between 5 and 7 pm
        let startTime = randStartTime(addHour(targetDate, 17), addHour(targetDate, 19));
        console.log(0, startTime);

        // start Session
        if (!session.sessionStart) {
          session.sessionStart = startTime;
        }

        const activitySets: ActivitySetDTO[] = [];

        // Activities
        for (let actIndex = 0; actIndex < activities.length; actIndex++) {
          const activity: ActivityDTO = faker.helpers.arrayElement(activities);
          console.log(1, `  ${activity.title}`);

          // account for set up time for Activity
          startTime = advanceTime(startTime);

          // starting mass
          let mass = multipleOfFive(5, 15);

          // start Set
          const activitySet: ActivitySetDTO = {
            activitySlug: activity.slug as string,
            activityTitle: activity.title,
            setStart: startTime,
            attributeSets: [],
          };

          // Sets
          const numberOfSets = faker.helpers.rangeToNumber({ min: 2, max: 4 });
          console.log(2, `    number of sets ${numberOfSets}`);
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
                    attributeValue: mass,
                  });
                  break;
                case AttributeTypes.NUMBER:
                  activityAttributeSet.push({
                    title: attribute.title,
                    slug: attribute.slug,
                    description: attribute.description,
                    attributeType: attribute.attributeType,
                    attributeValue: faker.helpers.rangeToNumber({ min: 6, max: 10 }),
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
          activitySets.push(activitySet);
        }
        console.log(3, activitySets);
        // session.activitySets?.push( activitySets);
      }
    }
  } else {
    //TODO
  }

  console.log(session);
}
