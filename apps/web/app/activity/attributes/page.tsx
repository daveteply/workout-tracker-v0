import { ActivityAttributeCreateForm } from '@repo/ui/activity-attribute-create-form';
import {
  createActivityAttribute,
  deleteActivityAttribute,
  updateActivityAttribute,
} from './activity-attribute-actions';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { ActivityAttributeUpdateForm } from '@repo/ui/activity-attribute-update-form';
import { ActivityAttributeDeleteForm } from '@repo/ui/activity-attribute-delete-form';

export default async function ActivityAttributesPage(params: any) {
  // Activity Attribute Types
  const activityAttributeTypesResponse = await fetch(
    'http://localhost:8080/v1/activity-attribute/types',
  );
  const activityAttributeTypes = await activityAttributeTypesResponse.json();

  // Activity Attributes
  const activityAttributesResponse = await fetch('http://localhost:8080/v1/activity-attribute');
  const activityAttributes = await activityAttributesResponse.json();

  return (
    <div>
      <h3>Activity Attributes</h3>
      <ActivityAttributeCreateForm
        createActivityAttributeAction={createActivityAttribute}
        attributeTypes={activityAttributeTypes}
      />
      <div className="overflow-x-auto">
        <table className="table table-xs md:table-md">
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activityAttributes.map((attribute: ActivityAttributeDTO) => (
              <tr key={attribute.attribute_id}>
                <td>{attribute.attribute_id}</td>
                <td>{attribute.description}</td>
                <td>{attribute.attribute_type}</td>
                <td>
                  <div className="flex justify-end">
                    <ActivityAttributeUpdateForm
                      updateActivityAction={updateActivityAttribute}
                      attributeTypes={activityAttributeTypes}
                      dto={attribute}
                    />
                    <ActivityAttributeDeleteForm
                      deleteActivityAction={deleteActivityAttribute}
                      id={attribute.attribute_id}
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
