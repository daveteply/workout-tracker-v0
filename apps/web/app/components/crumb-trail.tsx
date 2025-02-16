'use server';

import Link from 'next/link';
import { ParsedUrlQueryInput } from 'querystring';

export interface CrumbTrailEntry {
  label: string;
  pathname?: string;
  query?: string | ParsedUrlQueryInput | null | undefined;
}

export async function CrumbTrail({ entries }: { entries: CrumbTrailEntry[] }) {
  if (!entries) return null;
  return (
    <div className="flex">
      {entries.map((entry, index) => (
        <div key={index}>
          {entry.pathname?.length ? (
            <Link
              className="no-underline hover:underline mr-2"
              href={{ pathname: entry.pathname, query: entry.query }}
            >
              {entry.label}
            </Link>
          ) : (
            <span>{entry.label}</span>
          )}
          {index + 1 !== entries.length && <span className="mr-2">&gt;</span>}
        </div>
      ))}
    </div>
  );
}
