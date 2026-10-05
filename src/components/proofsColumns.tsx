'use client';

import { ProofDTO } from '@/types/dto';
import { ColumnDef } from '@tanstack/react-table';
import VerdictTrueIcon from './verdictTrueIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { ReactNode } from 'react';
import { JobStatus, Verdict } from '@/constants';
import VerdictFalseIcon from './verdictFalseIcon';
import VerdictMisleadingIcon from './verdictMisleadingIcon';
import VerdictPartiallyTrueIcon from './verdictPartiallyTrueIcon';
import VerdictOutdatedIcon from './verdictOutdatedIcon';
import VerdictUnverifiableIcon from './verdictUnverifiableIcon';
import VerdictSatireIcon from './verdictSatireIcon';

export const VERDICT_SMALL_ICON_MAP: Record<Verdict, ReactNode> = {
  [Verdict.TRUE]: <VerdictTrueIcon className='size-6' />,
  [Verdict.FALSE]: <VerdictFalseIcon className='size-6' />,
  [Verdict.MISLEADING]: <VerdictMisleadingIcon className='size-6' />,
  [Verdict.PARTIALLY_TRUE]: <VerdictPartiallyTrueIcon className='size-6' />,
  [Verdict.OUTDATED]: <VerdictOutdatedIcon className='size-6' />,
  [Verdict.UNVERIFIABLE]: <VerdictUnverifiableIcon className='size-6' />,
  [Verdict.SATIRE]: <VerdictSatireIcon className='size-6' />,
  [Verdict.NONE]: <VerdictUnverifiableIcon className='size-6' />,
};

export const proofsColumns: ColumnDef<ProofDTO>[] = [
  {
    accessorKey: 'thumbnailUrl',
    header: 'Reel',
    cell: ({ row }) => (
      <div className='size-10 shrink-0'>
        <Image
          src='/images/hero.png'
          alt='media-image'
          width={40}
          height={40}
          priority
          className='size-full rounded-md object-contain'
        />
      </div>
    ),
    meta: {
      width: '100px',
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <div className='flex items-center'>{row.original.title}</div>,
    meta: {
      width: '60%',
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div className='flex items-center'>{row.original.status}</div>,
    meta: {
      width: '200px',
    },
  },
  {
    accessorKey: 'verdict',
    header: 'Verdict',
    cell: ({ row }) => (
      <div className='flex gap-2 items-center'>
        {row.original.status !== JobStatus.IN_PROGRESS && (
          <>
            {VERDICT_SMALL_ICON_MAP[row.original.verdict as Verdict]}
            {row.original.verdict}
          </>
        )}
      </div>
    ),
    meta: {
      width: '30%',
    },
  },
  {
    accessorKey: 'timeTaken',
    header: 'Time taken',
    cell: ({ row }) => <div className='flex items-center'>{row.original.timeTaken}</div>,
    meta: {
      width: '200px',
    },
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => {
      const proof = row.original;
      return (
        <div className='flex items-center'>
          {proof.status === JobStatus.COMPLETED || proof.status === JobStatus.FAILED ? (
            <Link href={`/proofs/${proof.id}`}>
              <Eye size={16} />
            </Link>
          ) : (
            <span className='cursor-not-allowed opacity-40'>
              <Eye size={16} />
            </span>
          )}
        </div>
      );
    },
    meta: {
      width: '70px',
    },
  },
];
