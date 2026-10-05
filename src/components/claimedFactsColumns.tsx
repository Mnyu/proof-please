'use client';

import { ClaimedFactDTO } from '@/types/dto';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';
import VerdictTrueIcon from './verdictTrueIcon';

export const claimedFactColumns: ColumnDef<ClaimedFactDTO>[] = [
  {
    accessorKey: 'fact',
    header: 'Fact',
    cell: ({ row }) => <div className='whitespace-normal break-words'>{row.original.fact}</div>,
    meta: {
      width: '40%',
    },
  },
  {
    accessorKey: 'verdict',
    header: 'Verdict',
    cell: ({ row }) => (
      <div className='flex flex-col gap-2 justify-center'>
        <VerdictTrueIcon className='size-6' />
        {row.original.verdict}
      </div>
    ),
    meta: {
      width: '200px',
    },
  },
  {
    accessorKey: 'confidence',
    header: 'Confidence',
    cell: ({ row }) => <div className=''>{row.original.confidence * 100}%</div>,
    meta: {
      width: '100px',
    },
  },
  {
    accessorKey: 'rationale',
    header: 'Rationale',
    cell: ({ row }) => <div className='whitespace-normal break-words'>{row.original.rationale}</div>,
    meta: {
      width: '60%',
    },
  },
  {
    accessorKey: 'citations',
    header: 'Citations',
    cell: ({ row }) => (
      <ul className='space-y-1.5'>
        {row.original.citations.map((citation, index) => (
          <li key={index} className='flex items-start gap-2 leading-[1.2]'>
            <Button asChild variant='link' size='sm' className='h-7 px-2'>
              <a href={citation} target='_blank' rel='noopener noreferrer'>
                {new URL(citation).hostname.replace(/^www\./, '')}
                <ExternalLink className='ml-1.5 h-3.5 w-3.5' />
              </a>
            </Button>
          </li>
        ))}
      </ul>
    ),
    meta: {
      width: '200px',
    },
  },
];
