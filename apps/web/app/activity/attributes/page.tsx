import {
  createActivityAttribute,
  deleteActivityAttribute,
  updateActivityAttribute,
} from './activity-attribute-actions';
import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';
import { ActivityAttributeCreateForm } from './components/create-form';
import { ActivityAttributeDeleteForm } from './components/delete-form';
import { ActivityAttributeUpdateForm } from './components/update-form';
import { getAttributes, getAttributeTypes } from '../../../utils/data-fetch';

/**
 * General use Activity Attributes to be attached to an Activity
 * @param params
 * @returns
 */
export default async function ActivityAttributesPage() {
  const [activityAttributeTypes, activityAttributes] = await Promise.all([
    getAttributeTypes(),
    getAttributes(),
  ]);

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
