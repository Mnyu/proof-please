'use client';

import { Button } from '@/components/ui/button';

interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
}

export const DataTablePagination = ({
  page,
  pageSize,
  totalPages,
  totalRecords,
  onPageChange,
}: DataTablePaginationProps) => {
  const start = totalRecords === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalRecords);
  return (
    <div className='flex items-center justify-between'>
      <div className='text-muted-foreground text-sm'>
        Showing {start} - {end} of {totalRecords}
      </div>

      <div className='flex gap-2'>
        <Button variant='outline' disabled={page === 1} onClick={() => onPageChange(1)}>
          First
        </Button>

        <Button variant='outline' disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </Button>

        <div className='flex items-center px-3 text-sm'>
          {page} / {totalPages}
        </div>

        <Button variant='outline' disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          Next
        </Button>

        <Button variant='outline' disabled={page >= totalPages} onClick={() => onPageChange(totalPages)}>
          Last
        </Button>
      </div>
    </div>
  );
};
