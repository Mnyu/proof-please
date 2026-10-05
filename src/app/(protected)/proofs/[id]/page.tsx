import ClaimedFactsTable from '@/components/claimedFactsTable';
import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import VerdictFalseIcon from '@/components/verdictFalseIcon';
import VerdictMisleadingIcon from '@/components/verdictMisleadingIcon';
import VerdictOutdatedIcon from '@/components/verdictOutdatedIcon';
import VerdictPartiallyTrueIcon from '@/components/verdictPartiallyTrueIcon';
import VerdictSatireIcon from '@/components/verdictSatireIcon';
import VerdictTrueIcon from '@/components/verdictTrueIcon';
import VerdictUnverifiableIcon from '@/components/verdictUnverifiableIcon';
import VerdictKPIs from '@/components/verditcKpis';
import { Verdict } from '@/constants';
import { getFactCheckJob } from '@/service';
import { SquarePen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface VerdictConfig {
  text: string;
  description: string;
  bgColorClass: string;
  textColorClass: string;
  descColorClass: string;
  icon: ReactNode;
}

export const VERDICT_MAP: Record<Verdict, VerdictConfig> = {
  [Verdict.TRUE]: {
    text: 'True',
    description: 'Well supported by credible, recent sources',
    bgColorClass: 'bg-emerald-50/70',
    textColorClass: 'text-emerald-950',
    descColorClass: 'text-emerald-950/70',
    icon: <VerdictTrueIcon />,
  },
  [Verdict.FALSE]: {
    text: 'False',
    description: 'Directly contradicted by credible sources',
    bgColorClass: 'bg-red-50/70',
    textColorClass: 'text-red-950',
    descColorClass: 'text-red-950/70',
    icon: <VerdictFalseIcon />,
  },
  [Verdict.MISLEADING]: {
    text: 'Misleading',
    description: 'Accurate but framed to create a false impression',
    bgColorClass: 'bg-orange-50/70',
    textColorClass: 'text-orange-950',
    descColorClass: 'text-orange-950/70',
    icon: <VerdictMisleadingIcon />,
  },
  [Verdict.PARTIALLY_TRUE]: {
    text: 'Partially True',
    description: 'Core claim true but missing significant context',
    bgColorClass: 'bg-amber-50/70',
    textColorClass: 'text-amber-950',
    descColorClass: 'text-amber-950/70',
    icon: <VerdictPartiallyTrueIcon />,
  },
  [Verdict.OUTDATED]: {
    text: 'Outdated',
    description: 'Was true, but contradicted by more recent data',
    bgColorClass: 'bg-blue-50/70',
    textColorClass: 'text-blue-950',
    descColorClass: 'text-blue-950/70',
    icon: <VerdictOutdatedIcon />,
  },
  [Verdict.UNVERIFIABLE]: {
    text: 'UNVERIFIABLE',
    description: 'Insufficient publicly available evidence',
    bgColorClass: 'bg-slate-50/70',
    textColorClass: 'text-slate-950',
    descColorClass: 'text-slate-950/70',
    icon: <VerdictUnverifiableIcon />,
  },
  [Verdict.SATIRE]: {
    text: 'Satire',
    description: 'Content is satirical, no factual claims to verify',
    bgColorClass: 'bg-violet-50/70',
    textColorClass: 'text-violet-950',
    descColorClass: 'text-violet-950/70',
    icon: <VerdictSatireIcon />,
  },
  [Verdict.NONE]: {
    text: 'None',
    description: 'None',
    bgColorClass: '',
    textColorClass: '',
    descColorClass: '',
    icon: <VerdictUnverifiableIcon />,
  },
};

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
