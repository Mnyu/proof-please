'use client';

import { Input } from '@/components/ui/input';

interface Props {
  symbol?: string;

  onSymbolChange: (value: string) => void;
}

export const DataTableToolbar = ({ symbol, onSymbolChange }: Props) => {
  return (
    <div className='flex gap-2'>
      <Input placeholder='Filter symbol...' value={symbol ?? ''} onChange={(e) => onSymbolChange(e.target.value)} />
    </div>
  );
};
