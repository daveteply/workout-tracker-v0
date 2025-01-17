import {
  createActivityAttribute,
  deleteActivityAttribute,
  updateActivityAttribute,
} from './activity-attribute-actions';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { ActivityAttributeCreateForm } from '@repo/ui/activity-attribute-create-form';
import { ActivityAttributeDeleteForm } from '@repo/ui/activity-attribute-delete-form';
import { ActivityAttributeUpdateForm } from '@repo/ui/activity-attribute-update-form';
import { API_STRUCTURE_URL } from '../../constants';

/**
 * General use Activity Attributes to be attached to an Activity
 * @param params
 * @returns
 */
export default async function ActivityAttributesPage() {
  // Activity Attribute Types
  const activityAttributeTypesResponse = await fetch(`${API_STRUCTURE_URL}/v1/attributes/types`);
  const activityAttributeTypes = await activityAttributeTypesResponse.json();

  // Activity Attributes
  const activityAttributesResponse = await fetch(`${API_STRUCTURE_URL}/v1/attributes`);
  const activityAttributes = await activityAttributesResponse.json();

  return (
    <div>
      <h3>Activity Attributes</h3>
      <p>
        These attributes are intended to become describers of Activity functionality. They are used
        create the input form for various types of Activities during Tracking.
      </p>
      <ActivityAttributeCreateForm
        createActivityAttributeAction={createActivityAttribute}
        attributeTypes={activityAttributeTypes}
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
                    <ActivityAttributeUpdateForm
                      updateActivityAttributeAction={updateActivityAttribute}
                      attributeTypes={activityAttributeTypes}
                      dto={attribute}
                    />
                    <ActivityAttributeDeleteForm
                      deleteActivityAttributeAction={deleteActivityAttribute}
                      slug={attribute.slug}
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
