export interface TablePagination {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

export type SortDirection = 'asc' | 'desc';

export interface TableState {
  page: number;
  pageSize: number;
  sort?: string;
  direction?: SortDirection;
}
