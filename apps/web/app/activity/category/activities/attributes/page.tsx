import { attachActivityAttributes, removeActivityAttributes } from './activity-attributes-actions';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { ActivityAttributesAttachForm } from './components/attach-form';
import { ActivityAttributesRemoveForm } from './components/remove-form';
import { getActivity, getActivityAttributes, getAttributes } from '../../../../../utils/data-fetch';
import { CrumbTrail, CrumbTrailEntry } from '../../../../components/crumb-trail';

/**
 * Associate Attributes to an Activity
 * @param param0
 * @returns
 */
export default async function ActivityCategoryActivitiesAttributesPage({
  searchParams,
}: {
  searchParams: Promise<{ s: string; cs: string }>;
}) {
  const params = await searchParams;
  const activitySlug = params.s;
  const activityCategorySlug = params.cs;

  const [attributes, activity, activityAttributes] = await Promise.all([
    getAttributes(),
    getActivity(activitySlug),
    getActivityAttributes(activitySlug),
  ]);

  const crumbEntries: CrumbTrailEntry[] = [
    { label: 'Categories', pathname: '/activity/category', query: { cs: activityCategorySlug } },
    {
      label: 'Activities',
      pathname: '/activity/category/activities/',
      query: { cs: activityCategorySlug },
    },
    { label: 'Attributes' },
  ];

  return (
    <div>
      <CrumbTrail entries={crumbEntries} />

      <h3>
        Attributes for <span className="font-bold italic capitalize">{activity.title}</span>
      </h3>
      <ActivityAttributesAttachForm
        createActivityAttributesAction={attachActivityAttributes}
        attributes={attributes}
        activitySlug={activitySlug}
      />
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activityAttributes.map((attribute: ActivityAttributeDTO) => (
              <tr key={attribute.slug}>
                <td>{attribute.title}</td>
                <td>{attribute.description}</td>
                <td>{attribute.attributeType}</td>
                <td>
                  <div className="flex justify-end">
                    <ActivityAttributesRemoveForm
                      activitySlug={activitySlug}
                      attributeSlug={attribute.slug}
                      deleteActivityAttributesAction={removeActivityAttributes}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
