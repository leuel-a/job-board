import { redirect } from 'next/navigation';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Select from '@/components/ui/select';

import prisma from '@/lib/prisma';
import { jobTypes } from '@/lib/job-types';
import { Button } from './ui/button';

import { jobFilterSchema } from '../lib/validation';

async function filterJobs(formData: FormData) {
  'use server';
  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: 'true' }),
  });

  redirect(`/?${searchParams.toString()}`);
}

export default async function JobFilterSideBar() {
  const distnictLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ['location'],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, Company, etc..." />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue="">
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All locations</option>
              {distnictLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="remote"
              type="checkbox"
              name="remote"
              className="scale-125 accent-black"
            />
            <Label htmlFor="remote">Remote Jobs</Label>
          </div>
          <Button type="submit" className="w-full">
            Filter Jobs
          </Button>
        </div>
      </form>
    </aside>
  );
}
