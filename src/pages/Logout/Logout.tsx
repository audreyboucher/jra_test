import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Spinner } from '@radix-ui/themes';

import { useAuth } from '../../context/auth';

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const logout = () => {
    return new Promise((resolve) => {
      setAuth({ token: null, role: null });
      resolve(true);
    });
  };

  useEffect(() => {
    logout().then(() => {
      navigate('/', { replace: true });
    });
  }, []);

  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Spinner size="3" />
    </Flex>
  );
}

export default Logout;
