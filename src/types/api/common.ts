export type PaginationRequest = {
  page?: number;
  limit?: number;
};

export type PaginationResponse<T> = {
  item: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
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
