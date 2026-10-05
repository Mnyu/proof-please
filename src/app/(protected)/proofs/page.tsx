import Appetite from '@/components/appetite';
import ProofsTable from '@/components/proofsTable';
import { getFactCheckJobs } from '@/service';
import { JobsListFilters } from '@/types/api';

interface ProofsProps {
  searchParams: Promise<JobsListFilters>;
}

const Proofs = async ({ searchParams }: ProofsProps) => {
  const params = await searchParams;
  const data = await getFactCheckJobs(params);
  return (
    <section className='w-full flex flex-col gap-4 p-1 overflow-auto focus-visible:outline-none'>
      <Appetite />
      <ProofsTable data={data} />
    </section>
  );
};
export default Proofs;
