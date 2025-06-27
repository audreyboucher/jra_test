import React, { FC, ReactElement, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Theme } from "@radix-ui/themes";

import { AuthContext, useAuth } from './context/auth';
import { Home, Login } from './pages';

const PrivateRoute: FC<{ children: ReactElement }> = ({ children }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? children : <Navigate replace to="/login" />;
};

const App = () => {
  const [authToken, setAuthToken] = useState<string>('');

  const setToken = (token: string | null) => {
    if (token) localStorage.setItem('token', JSON.stringify(token));
    else localStorage.removeItem('token');

    setAuthToken(token || '');
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <Router>
        <Theme
          accentColor="mint"
          grayColor="gray"
          panelBackground="solid"
          scaling="100%"
          radius="full"
          appearance="dark"
        >
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Theme>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
