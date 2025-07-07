import { login } from '../api/methods/users';
import { getContacts, getContactById, updateContactById, deleteContactById, createContact } from '../api/methods/contacts';

import type {
  LoginRequest,
  GetContactsRequest,
  UpdateContactRequest,
  CreateContactRequest,
} from '../types/api';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DEL = 'DELETE',
};

export const sendFakeRequest =  async <T, R>(method: Method, url: string, data: T): Promise<R> => {
  switch (method) {
    case Method.GET:
      switch (url) {
        case '/contacts':
          return getContacts(data as GetContactsRequest) as Promise<R>;
        case url.match(/\/contacts\/(\w+)/)?.input:
          return getContactById(url.match(/\/contacts\/(\w+)/)![1]) as Promise<R>;
      };
      break;
    case Method.POST:
      switch (url) {
        case '/login':
          return login(data as LoginRequest) as Promise<R>;
        case '/contacts':
          return createContact(data as CreateContactRequest) as Promise<R>;
      };
      break;
    case Method.PATCH:
      switch (url) {
        case url.match(/\/contacts\/(\w+)/)?.input:
          return updateContactById(url.match(/\/contacts\/(\w+)/)![1], data as UpdateContactRequest) as Promise<R>;
      };
      break;
    case Method.DEL:
      switch (url) {
        case url.match(/\/contacts\/(\w+)/)?.input:
          return deleteContactById(url.match(/\/contacts\/(\w+)/)![1]) as Promise<R>;
      }
      break;
  };

  return new Promise((_, reject) => { reject({ message: 'Request not found', }); }) as Promise<R>;
};

export const sendRequest = async <R, T>(method: Method, url: string, data?: R): Promise<T> => {
  let headers = new Headers();

  // headers.append('Content-Type', 'application/json');
  // headers.append('Accept', 'application/json');
  headers.append('Origin', 'http://localhost:3000');

  return fetch(`https://jeanrouyerautomobiles.deno.dev${url}`, {
    // mode: 'no-cors',
    // credentials: 'include',
    method,
    headers,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok || response.status !== 200) throw new Error(response.statusText);
      return response.json() as Promise<{ data: T }>;
    })
    .then(res => res.data);
};
