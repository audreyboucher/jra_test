import { login } from '../api/methods/users';

import { LoginRequest } from '../types/api';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DEL = 'DELETE',
};

export const sendFakeRequest =  async <R, T>(method: Method, url: string, data?: R): Promise<T> => {
  switch (url) {
    case '/login':
      return login(data as LoginRequest) as Promise<T>;
    default:
      return new Promise(() => {});
  }
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
