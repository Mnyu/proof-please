import { Pagination } from '@/types/dto';

export const buildPagination = (page: number, pageSize: number, totalRecords: number): Pagination => {
  const totalPages = Math.ceil(totalRecords / pageSize);
  return {
    page,
    pageSize,
    totalRecords,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};
