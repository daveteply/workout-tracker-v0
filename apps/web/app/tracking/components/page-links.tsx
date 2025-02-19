import Link from 'next/link';
import { ITEMS_PER_PAGE } from '../../constants';

export function PageLinks({ count, currentPage }: { count: number; currentPage: number }) {
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
  return (
    <div className="join">
      {Array.from({ length: totalPages }, (_, num) => (
        <Link
          className={`no-underline btn btn-sm ${currentPage === num + 1 ? 'btn-disabled' : ''}`}
          key={num}
          href={{ pathname: './tracking', query: { pn: num + 1 } }}
        >
          {num + 1}
        </Link>
      ))}
    </div>
  );
}
