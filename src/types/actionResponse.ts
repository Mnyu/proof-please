import { AppError } from '@/errors';

export type ActionResponse<T = void> = ActionSuccess<T> | ActionFailure;

export interface ActionSuccess<T> {
  success: true;
  data: T;
}

export interface ActionFailure {
  success: false;
  error: AppError;
}

export const actionSuccess = <T>(data: T): ActionSuccess<T> => {
  return {
    success: true,
    data,
  };
};

export const actionFailure = (error: AppError): ActionFailure => {
  return {
    success: false,
    error,
  };
};
