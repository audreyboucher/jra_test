import React, { FC, ReactElement, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext, useIsAuthenticated } from './context/auth';
import Users from './api/users.json';

import { Contacts, Login, Logout } from './pages';

import { LoginResponse, User } from './types/api';
import { Nullable } from './types';

import './styles/global.scss';

const getUserRole = (token: User['token'] | null): User['role'] | null => {
  if (token) {
    const user = (Users as User[]).find(({ token: userToken }) => userToken === token);
    return user ? user.role : null;
  }

  return null;
};

const PrivateRoute: FC<{ children: ReactElement }> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? children : <Navigate replace to="/login" />;
};

export const routes = [
  {
    path: '/',
    element: <PrivateRoute><Contacts /></PrivateRoute>,
  },
  {
    path: '/contacts',
    element: <PrivateRoute><Contacts /></PrivateRoute>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
];

const App = () => {
  const [authToken, setAuthToken] = useState<User['token'] | null>(localStorage.getItem('token'));
  const [authRole, setAuthRole] = useState<User['role'] | null>(getUserRole(authToken));

  const setAuth = ({ token, role }: Nullable<LoginResponse>) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');

    setAuthToken(token);
    setAuthRole(role);
  };

  return (
    <AuthContext.Provider value={{ auth: { token: authToken, role: authRole }, setAuth }}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            {routes.map((props) => <Route {...props} />)}
          </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
