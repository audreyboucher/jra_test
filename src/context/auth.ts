import { createContext, useContext } from 'react';

import { Nullable } from '../types';
import { LoginResponse, User, Role } from '../types/api';

export type AuthType = {
  auth: Nullable<LoginResponse> | null;
  setAuth: (user: Nullable<LoginResponse>) => void;
};

export const initialState: AuthType = {
  auth: { token: 'admin-token', role: Role.Admin },
  setAuth: () => {},
};

export const AuthContext = createContext<AuthType>({ auth: null, setAuth: () => {} });

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useIsAuthenticated = (): boolean => {
  const { auth } = useContext(AuthContext);
  return !!(auth && auth.token && auth.role);
};

export const useToken = (): User['token'] | null => {
  return useContext(AuthContext).auth?.token || null;
};

export const useRole = (): Role | null => {
  return useContext(AuthContext).auth?.role || null;
};
