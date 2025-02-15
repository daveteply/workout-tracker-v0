'use server';

import { getSessionActivityAttributeHistory } from '../../../../../../utils/data-fetch';
import { DateTime } from '../../../../../components/date-time';

export async function PreviousActivity({
  memberSlug,
  activitySlug,
}: {
  memberSlug?: string;
  activitySlug?: string;
}) {
  const attributeHistory = await getSessionActivityAttributeHistory(memberSlug, activitySlug, 1);

  return (
    <div>
      {attributeHistory?.length !== 0 && (
        <div>
          <hr className="mt-2 mb-2" />
          {attributeHistory.map((ah) => (
            <div key={ah.slug}>
              <span>Last time...</span>&nbsp;
              <DateTime date={ah.start as Date} />
              <div className="flex flex-wrap p-2">
                {ah.attributeSets?.map((attribSet, inx) => (
                  <div key={inx} className="border rounded-md p-4 mr-4 mb-4">
                    {attribSet.attributes.map((attr, i) => (
                      <div key={i}>
                        {attr.title} {attr.value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
