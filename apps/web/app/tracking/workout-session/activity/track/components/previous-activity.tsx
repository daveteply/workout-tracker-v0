'use server';

import { getSessionActivityAttributeHistory } from '../../../../../../utils/data-fetch';
import { DateTime } from '../../../../../components/date-time';
import { AttributeGroup } from './attribute-group';

export async function PreviousActivity({
  memberSlug,
  activitySlug,
}: {
  memberSlug?: string;
  activitySlug?: string;
}) {
  const data = await getSessionActivityAttributeHistory(memberSlug, activitySlug, 1);

  // This component is intended to show a single entry
  const attributeHistory = data.length ? data[0] : undefined;

  return (
    <div>
      {attributeHistory && (
        <div>
          <hr className="mt-2 mb-2" />
          <div className="text-sm">
            <span>Last time...</span>&nbsp;
            <DateTime date={attributeHistory.start as Date} />
          </div>
          <div className="flex flex-wrap">
            {attributeHistory.attributeSets?.map((ahSet, inx) => (
              <AttributeGroup key={inx} attributeSet={ahSet} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
