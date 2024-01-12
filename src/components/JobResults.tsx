import { JobFilterValues } from '@/lib/validation';
import JobListItem from './JobListItem';
import prisma from '@/lib/prisma';

interface JobResultsProps {
  filterValues: JobFilterValues;
}

export default async function JobResults({
  filterValues: { q, type, location, remote },
}: JobResultsProps) {
  // const searchString = q?.split(" ").filter(word => word.length > 0);

  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
    </div>
  );
}
