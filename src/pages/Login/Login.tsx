import React, { FC, useState, FormEventHandler } from 'react';
import { Navigate } from 'react-router-dom'; 
import { Card, Container, Heading, Flex, TextField, Button, Callout } from '@radix-ui/themes';
import { AvatarIcon, LockOpen1Icon, CrossCircledIcon } from '@radix-ui/react-icons';

import { LoginRequest, LoginResponse, User } from '../../types/api';
import { useAuth, useIsAuthenticated } from '../../context/auth';
import { sendFakeRequest, Method } from '../../utils/api';

const Login: FC = () => {
  const isLoggedIn = useIsAuthenticated();
  const { setAuth } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<User['email']>('');
  const [password, setPassword] = useState<User['password']>('');

  const login: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setError(null);

    sendFakeRequest<LoginRequest, LoginResponse>(Method.POST, '/login', { email, password })
      .then((data) => { setAuth(data); })
      .catch(({ message }) => { setError(message); });
  };

  return (
    isLoggedIn
      ? <Navigate to="/" />
      : (
        <Flex justify="center" align="center" minHeight="100vh">
          <Container size="1">
            <Card>
              <Flex direction="column" gap="6">
                <Heading as="h1" align="center">Log in</Heading>

                <form onSubmit={login}>
                  <Flex direction="column" gap="3">
                    <TextField.Root
                      size="3"
                      placeholder="Email address"
                      type="email"
                      value={email}
                      onChange={({ target: { value } }) => {
                        setEmail(value);
                        setError(null);
                      }}
                      tabIndex={1}
                    >
                      <TextField.Slot><AvatarIcon /></TextField.Slot>
                    </TextField.Root>

                    <TextField.Root
                      size="3"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={({ target: { value } }) => {
                        setPassword(value);
                        setError(null);
                      }}
                      tabIndex={2}
                    >
                      <TextField.Slot><LockOpen1Icon /></TextField.Slot>
                    </TextField.Root>

                    {error && (
                      <Callout.Root color="red">
                        <Callout.Icon><CrossCircledIcon color="red" /></Callout.Icon>
                        <Callout.Text>{ error }</Callout.Text>
                      </Callout.Root>
                    )}

                    <Button
                      size="3"
                      type="submit"
                      variant="solid"
                      style={{ cursor: 'pointer' }}
                      tabIndex={3}
                    >
                      Login
                    </Button>
                  </Flex>
                </form>
              </Flex>
            </Card>
          </Container>
        </Flex>
      )
  );
};

export default Login;
