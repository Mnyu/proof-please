'use client';

import { ProofDTO } from '@/types/dto';
import { ColumnDef } from '@tanstack/react-table';
import VerdictTrueIcon from './verdictTrueIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';

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
        <VerdictTrueIcon className='size-6' />
        {row.original.verdict}
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
          <Link href={`/proofs/${proof.id}`}>
            <Eye size={16} />
          </Link>
        </div>
      );
    },
    meta: {
      width: '70px',
    },
  },
];
