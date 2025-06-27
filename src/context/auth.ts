import { createContext, useContext } from 'react';

import { User } from '../types/api';

export type AuthType = {
  authToken: User['token'] | null;
  setAuthToken: (token: string) => void;
};

export const AuthContext = createContext<AuthType>({ authToken: null, setAuthToken: () => {} });

export const useAuth = () => {
  return useContext(AuthContext);
};
