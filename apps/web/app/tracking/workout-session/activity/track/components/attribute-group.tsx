import { ActivityAttributeSetDTO } from '@repo/dto/activity-attribute-set';

export function AttributeGroup({ attributeSet }: { attributeSet: ActivityAttributeSetDTO }) {
  return (
    <table className="rounded-lg bg-accent-content w-full max-w-1/4 mr-3">
      <tbody>
        {attributeSet?.attributes?.length &&
          attributeSet.attributes.map((attr, inx) => (
            <tr key={inx}>
              <td>{attr.title}</td>
              <td>{attr.value}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
