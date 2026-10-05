import Appetite from '@/components/appetite';
import ProofsTable from '@/components/proofsTable';

const Proofs = () => {
  return (
    <section className='w-full flex flex-col gap-4 p-1 overflow-auto focus-visible:outline-none'>
      <Appetite />
      <ProofsTable />
    </section>
  );
};
export default Proofs;
