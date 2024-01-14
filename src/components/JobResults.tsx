import { JobFilterValues } from '@/lib/validation';
import JobListItem from './JobListItem';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

export default async function JobResults({
  filterValues,
  page = 1,
}: JobResultsProps) {
  const { q, type, location, remote } = filterValues;
  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;

  const searchString = q
    ?.split(' ')
    .filter((word) => word.length > 0)
    .join(' & '); // Postgres Search Operator

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { location: { search: searchString } },
          { locationType: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: 'Remote' } : {},
      { approved: true },
    ],
  };

  const jobsPromise = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
    take: jobsPerPage,
    skip,
  });

  const countsPromise = prisma.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countsPromise]);

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No Jobs found. Try adjusting your search filters.
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPage={Math.ceil(totalResults / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  filterValues: JobFilterValues;
}

function Pagination({
  currentPage,
  totalPage,
  filterValues: { q, type, location, remote },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: 'true' }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          'flex items-center gap-2 font-semibold',
          currentPage <= 1 && 'invisible',
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPage}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          'flex items-center gap-2 font-semibold',
          currentPage >= totalPage && 'invisible',
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
