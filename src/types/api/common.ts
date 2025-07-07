export type PaginationRequest = {
  page?: number;
  limit?: number;
};

export type PaginationResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
};

export type Sort<T> = {
  sortBy?: keyof T;
  isDesc?: boolean;
};

export type Headers = {
  token: string;
};

export type Error<T> = string | {
  formErrors: string[];
  fieldErrors: Record<keyof T, [string]>;
};

export type ErrorResponse = {
  message: string;
};
