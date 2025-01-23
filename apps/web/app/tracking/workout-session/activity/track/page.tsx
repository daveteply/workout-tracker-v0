import { TrackingForm } from '@repo/ui/tracking-form';
import { API_STRUCTURE_URL } from '../../../../constants';
import { updateWorkoutSession } from './track-actions';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';

export default async function TrackingActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ s: string; secs: string }>;
}) {
  const params = await searchParams;
  const activitySlug = params.s;
  const sessionId = params.secs;

  // Activity
  const activityResponse = await fetch(`${API_STRUCTURE_URL}/v1/activities/${activitySlug}`);
  const activity = await activityResponse.json();

  // Activity Attributes
  const activityAttributesResponse = await fetch(
    `${API_STRUCTURE_URL}/v1/activity-attributes/activity/${activitySlug}`,
  );
  const activityAttributes = await activityAttributesResponse.json();

  // stripe out attribute related meta data
  const activityAttributeDTOs = activityAttributes.map((aa: ActivityAttributeDTO) => {
    return {
      slug: aa.slug,
      title: aa.title,
      description: aa.description,
      attributeType: aa.attributeType,
    };
  });

  return (
    <div>
      <h3>Tracking Activity - {activity.title}</h3>
      <TrackingForm
        workoutSessionId={sessionId}
        activitySlug={activitySlug}
        activityAttributes={activityAttributeDTOs}
        addSessionSetAction={updateWorkoutSession}
      />
    </div>
  );
}
