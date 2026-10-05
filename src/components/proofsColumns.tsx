'use client';

import { ProofDTO } from '@/types/dto';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from './ui/button';
import VerdictTrueIcon from './verdictTrueIcon';
import Image from 'next/image';

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
      width: '200px',
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <div className=''>{row.original.title}</div>,
    meta: {
      width: '60%',
    },
  },
  {
    accessorKey: 'verdict',
    header: 'Verdict',
    cell: ({ row }) => (
      <div className='flex gap-2 items-center'>
        <VerdictTrueIcon className='size-6' />
        {row.original.verdict}
      </div>
    ),
    meta: {
      width: '200px',
    },
  },
  {
    accessorKey: 'timeTaken',
    header: 'Time taken',
    cell: ({ row }) => <div className=''>{row.original.timeTaken}</div>,
    meta: {
      width: '200px',
    },
  },
];
