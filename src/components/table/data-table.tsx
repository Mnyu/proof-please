'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTablePagination } from './data-table-pagination';
import { useTableUrlState } from './use-table-url-state';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    width?: string;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: boolean;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  totalRecords?: number;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  pagination = false,
  page = 1,
  pageSize = 1,
  totalPages = 1,
  totalRecords = 1,
}: DataTableProps<TData, TValue>) => {
  const { updateParams } = useTableUrlState();

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='space-y-4'>
      <div className='overflow-x-auto rounded-md border'>
        <Table className='w-full min-w-[1000px] table-fixed'>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.column.columnDef.meta?.width,
                    }}
                    className='h-10 bg-muted/40 font-semibold text-muted-foreground'
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.columnDef.meta?.width,
                      }}
                      className='whitespace-normal break-words align-top text-muted-foreground'
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='text-center'>
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <DataTablePagination
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalRecords={totalRecords}
          onPageChange={(newPage) =>
            updateParams({
              page: newPage,
            })
          }
        />
      )}
    </div>
  );
};
