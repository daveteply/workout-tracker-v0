'use client';

import { ArrowsRightLeftIcon } from '@heroicons/react/16/solid';
import { MemberDTO } from '@repo/dto/member';
import { useEffect, useState } from 'react';

export function MemberSelector({
  members,
  currentMemberSlug,
  updateMemberAction,
}: {
  members: MemberDTO[];
  currentMemberSlug: string | undefined;
  updateMemberAction: (memberSlug: string) => void;
}) {
  // TODO: temp code until authentication is implemented
  const [currentMember, setCurrentMember] = useState<MemberDTO>();
  const [isOpen, setIsOpen] = useState(false);

  const updateCurrentMember = (memberSlug: string | undefined) => {
    const member = memberSlug ? members.find((m) => m.slug === memberSlug) : members[0];
    if (member) {
      updateMemberAction(member.slug as string);
      setCurrentMember(member);
    }
  };

  useEffect(() => {
    updateCurrentMember(currentMemberSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // TODO: investigate further to remove eslint error

  useEffect(() => {
    setIsOpen(false);
  }, [currentMember]);

  const handleClick = (memberSlug: string | undefined) => {
    setIsOpen(true);
    updateCurrentMember(memberSlug);
  };

  return (
    <div>
      <span className="pr-2 text-sm">{currentMember?.name}</span>
      <details className="dropdown dropdown-end" open={isOpen ? true : undefined}>
        <summary className="btn btn-sm">
          <ArrowsRightLeftIcon className="size-5" />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          {members.map((m) => (
            <li key={m.slug}>
              <button className="btn" onClick={() => handleClick(m.slug)}>
                {m.name}
              </button>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
