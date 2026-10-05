import { Verdict } from '@/constants';
import { VerifierResponse } from './types';

export type Pagination = {
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export interface PageResponse<T> {
  data: T[];
  pagination: Pagination;
}

export type ClaimedFactDTO = {
  fact: string;
  verdict: string;
  confidence: number;
  rationale: string;
  citations: string[];
};

export type ProofDTO = {
  id: string;
  thumbnailUrl: string;
  title: string;
  status: string;
  verdict: string;
  timeTaken: string;
};

export type FactCheckJobDTO = {
  id: string;
  thumbnailUrl: string;
  reelUrl: string;
  title: string;
  status: string;
  verdict: Verdict;
  timeTaken: string;
  verifierResponse: VerifierResponse;
  createdAt: string;
  updatedAt: string;
};
