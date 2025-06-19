import { ErrorResponse } from './common';
import { Contact } from './contact';

export interface File {
  id: string;
  contactId: Contact['id'];
  filename: string;
  mimeType: string;
  size: number;
  url: string;
};

type Response = File | ErrorResponse;

// GET /files
export type GetFilesRequest = null;
export type GetFilesResponse = File[] | ErrorResponse;

// POST /files
export type CreateFileRequest = {
  file: File;
  contactId: Contact['id'];
};
export type CreateFileResponse = Response;

// GET /files/:fileId
export type GetFileByIdRequest = null;
export type GetFileByIdResponse = Response;

// DELETE /files/:fileId
export type DeleteFileRequest = null;
export type DeleteFileResponse = null | ErrorResponse;
