import React from 'react';

import { renderWithProviders, mockLocalStorage } from './utils/tests';

import App from './App';

let mockGetItem = jest.fn();

describe('App', () => {
  beforeEach(async () => {
    const value = mockLocalStorage(localStorage);
    Object.defineProperty(window, 'localStorage', { value });
    mockGetItem = value.getItem;
  });

  describe('not logged in', () => {
    beforeEach(async () => {
      const value = mockLocalStorage({});
      Object.defineProperty(window, 'localStorage', { value });
      mockGetItem = value.getItem;
    });

    it(`doesn't have any token stored`, () => {
      renderWithProviders(<App />);

      expect(mockGetItem).toHaveBeenCalledTimes(1);
      expect(mockGetItem).toHaveBeenCalledWith('token');
      expect(mockGetItem).toHaveReturnedWith(null);
    });
  });

  describe('logged in as an admin', () => {
    beforeEach(async () => {
      const value = mockLocalStorage({ 'token': 'admin-token' });
      Object.defineProperty(window, 'localStorage', { value });
      mockGetItem = value.getItem;
    });

    it('has an admin token stored', () => {
      renderWithProviders(<App />);

      expect(mockGetItem).toHaveBeenCalledTimes(1);
      expect(mockGetItem).toHaveBeenCalledWith('token');
      expect(mockGetItem).toHaveReturnedWith('admin-token');
    });
  });

  describe('logged in as a user', () => {
    beforeEach(async () => {
      const value = mockLocalStorage({ 'token': 'user-token' });
      Object.defineProperty(window, 'localStorage', { value });
      mockGetItem = value.getItem;
    });

    it('has a user token stored', () => {
      renderWithProviders(<App />);

      expect(mockGetItem).toHaveBeenCalledTimes(1);
      expect(mockGetItem).toHaveBeenCalledWith('token');
      expect(mockGetItem).toHaveReturnedWith('user-token');
    });
  });
});
