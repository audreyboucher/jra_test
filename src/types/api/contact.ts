import { PaginationRequest, PaginationResponse, ErrorResponse } from './common';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type Response = Contact | ErrorResponse;

// GET /contacts
export type GetContactsRequest = {
  firstName?: string;
  lastName?: string;
  emailDomain?: string;
  hasFile?: boolean | 'true' | 'false';
} & PaginationRequest;
export type GetContactsResponse = PaginationResponse<Contact> | ErrorResponse;

// POST /contacts
export type CreateContactRequest = Omit<Contact, 'id'>;
export type CreateContactResponse = Response;

// GET /contacts/:contactId
export type GetContactByIdRequest = null;
export type GetContactByIdResponse = Response;

// PATCH /contacts/:contactId
export type UpdateContactRequest = Partial<Omit<Contact, 'id'>>;
export type UpdateContactResponse = Response;

// DELETE /contacts/:contactId
export type DeleteContactRequest = null;
export type DeleteContactResponse = null | ErrorResponse;
