import { ActivityAttributesCreateForm } from '@repo/ui/activity-attributes-create-form';
import { createActivityAttributes } from './activity-attributes-actions';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';

/**
 * Associate Attributes to an Activity
 * @param param0
 * @returns
 */
export default async function ActivityCategoryActivitiesAttributesPage({
  searchParams,
}: {
  searchParams: Promise<{ s: string }>;
}) {
  const activitySlug = (await searchParams).s;
  // Activity
  const activityResponse = await fetch(`http://localhost:8080/v1/activities/${activitySlug}`);
  const activity = await activityResponse.json();

  // Attributes
  const attributesResponse = await fetch(`http://localhost:8080/v1/attributes`);
  const attributes = await attributesResponse.json();

  // Attributes for Activity
  const activityAttributesResponse = await fetch(
    `http://localhost:8080/v1/activity-attributes/activity/${activitySlug}`,
  );
  const activityAttributes = await activityAttributesResponse.json();

  return (
    <div>
      <h3>
        Attributes for <span className="font-bold italic capitalize">{activity.title}</span>
      </h3>
      <ActivityAttributesCreateForm
        createActivityAttributesAction={createActivityAttributes}
        attributes={attributes}
        activitySlug={activitySlug}
      />
      <div className="overflow-x-auto">
        <table className="table table-xs md:table-md">
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
                    {/* <ActivityAttributeUpdateForm
                      updateActivityAttributeAction={updateActivityAttribute}
                      attributeTypes={attributeTypes}
                      dto={attribute}
                    />
                    <ActivityAttributeDeleteForm
                      deleteActivityAttributeAction={deleteActivityAttribute}
                      id={attribute.attribute_id}
                    /> */}
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
