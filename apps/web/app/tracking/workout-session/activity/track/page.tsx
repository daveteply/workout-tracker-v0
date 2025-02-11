import { updateWorkoutSession } from './track-actions';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { TrackingForm } from './components/tracking-form';
import { getActivity, getActivityAttributes } from '../../../../../utils/data-fetch';

export default async function TrackingActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ s: string; secs: string }>;
}) {
  const params = await searchParams;
  const activitySlug = params.s;
  const sessionId = params.secs;

  const [activity, activityAttributes] = await Promise.all([
    getActivity(activitySlug),
    getActivityAttributes(activitySlug),
  ]);

  // stripe out attribute related meta data
  const activityAttributeDTOs = activityAttributes.map((aa: ActivityAttributeDTO) => {
    return {
      slug: aa.slug,
      title: aa.title,
      description: aa.description,
      attributeType: aa.attributeType,
    };
  });

  // load existing Sets from the current Session
  // const activitySetResult = await fetch(
  //   `${API_TRACKING_URL}/v1/workout-set?s=${sessionId}&a=${activitySlug}`,
  // );
  // const activitySet = await activitySetResult.json();

  return (
    <div>
      <h3>Tracking Activity - {activity.title}</h3>
      <TrackingForm
        workoutSessionId={sessionId}
        activitySlug={activitySlug}
        activityTitle={activity.title}
        activityAttributes={activityAttributeDTOs}
        addSessionSetAction={updateWorkoutSession}
      />
      {/* {activitySet.length > 0 && (
        <div>
          <h4>Already in this Session</h4>
          <div className="flex flex-wrap">
            {activitySet.map((as: ActivitySetDTO, idx: number) => (
              <div key={idx} className="border rounded-md border-blue-700 mb-4 mr-4 p-2">
                {as.attributeSets?.map((acts: ActivityAttributeSetDTO, aIdx: number) => (
                  <div key={aIdx} className="bg-blue-900 mb-4 p-2">
                    <table className="table table-xs m-0">
                      <tbody>
                        {acts.attributes.map((aa: ActivityAttributeDTO, aaInx: number) => (
                          <tr key={aaInx}>
                            <td>{aa.title}</td>
                            <td>{aa.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
