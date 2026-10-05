import ClaimedFactsTable from '@/components/claimedFactsTable';
import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import VerdictKPIs from '@/components/verditcKpis';
import { getFactCheckJob } from '@/service';
import { SquarePen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type ProofProps = {
  params: Promise<{
    id: string;
  }>;
};

const Proof = async ({ params }: ProofProps) => {
  const { id } = await params;
  const proof = await getFactCheckJob(id);
  return (
    <section className='w-full flex flex-col gap-4 p-1 overflow-auto focus-visible:outline-none'>
      <section className=''>
        <Item>
          <ItemMedia className='size-15 shrink-0'>
            <Image
              src='/images/hero.png'
              alt='media-image'
              width={40}
              height={40}
              priority
              className='size-full rounded-md object-contain'
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className='text-xl leading-none font-semibold'>{proof.title}</ItemTitle>
            <ItemDescription>A simple item with title and description.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Link href={'/'}>
              <Button className='h-10 px-4 rounded-xl cursor-pointer'>
                <SquarePen /> New Proof
              </Button>
            </Link>
          </ItemActions>
        </Item>
      </section>
      <VerdictKPIs proof={proof} />
      <ClaimedFactsTable proof={proof} />
    </section>
  );
};
export default Proof;
