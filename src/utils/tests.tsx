import React, { FC, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';

import { AuthContext, initialState, type AuthType } from '../context/auth';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<AuthType>;
};

type Store = { [key: string]: string };

export const mockLocalStorage = (initialStore: Store = {}) => {
  let store: Store = initialStore;

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: any) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
};

export const renderWithProviders = (
  ui: React.ReactElement,
  { preloadedState }: ExtendedRenderOptions = {},
) => {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <AuthContext.Provider value={{ ...initialState, ...preloadedState }}>{children}</AuthContext.Provider>
  );

  return render(ui, { wrapper: Wrapper });
};
