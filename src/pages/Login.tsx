import React, { FC, useState, FormEventHandler } from 'react';
import { Navigate } from 'react-router-dom'; 
import { Container, Flex, TextField, Button, Callout } from '@radix-ui/themes';
import { AvatarIcon, LockOpen1Icon, CrossCircledIcon } from '@radix-ui/react-icons';

import { LoginRequest, LoginResponse, User } from '../types/api';
import { useAuth } from '../context/auth';
import { sendRequest, Method } from '../utils/api';

const Login: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [email, setEmail] = useState<User['email']>('');
  const [password, setPassword] = useState<User['password']>('');
  const { setAuthToken } = useAuth();

  const login: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    sendRequest<LoginRequest, LoginResponse>(Method.POST, '/login', { email, password })
      .then((data) => {
        const { token } = data;
        setAuthToken(token);
        setIsLoggedIn(true);
      })
      .catch(() => setIsError(true));
  };

  return (
    isLoggedIn
      ? <Navigate to="/" />
      : <Container size="1">
        <form onSubmit={login}>
          <Flex direction="column" gap="3">
            <TextField.Root
              size="3"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
            >
              <TextField.Slot>
                <AvatarIcon />
              </TextField.Slot>
            </TextField.Root>

            <TextField.Root
              size="3"
              placeholder="Password"
              type="password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            >
              <TextField.Slot>
                <LockOpen1Icon />
              </TextField.Slot>
            </TextField.Root>

            {isError && (
              <Callout.Root color="red">
                <Callout.Icon><CrossCircledIcon color="red" /></Callout.Icon>
                <Callout.Text>Something went wrong</Callout.Text>
              </Callout.Root>
            )}
            <Button size="3" type="submit" variant="solid">Login</Button>
          </Flex>
        </form>
      </Container>
  );
};

export default Login;
