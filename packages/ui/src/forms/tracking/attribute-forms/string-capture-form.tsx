import { ActivityAttributeDTO } from '@repo/dto/activity-attribute';

export function StringCaptureForm({ attribute }: { attribute: ActivityAttributeDTO }) {
  return (
    <label>
      <div>{attribute.title}:</div>
      <input
        className="input input-bordered w-1/3"
        type="text"
        min="0"
        name="attribute-value"
        required
      />
      <input type="hidden" value={attribute.slug} name="attribute-slug" />
      <input type="hidden" value={attribute.attributeType} name="attribute-type" />
      <div className="text-sm">{attribute.description}</div>
    </label>
  );
}
