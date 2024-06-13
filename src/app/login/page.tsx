'use client';

import { loginEmail } from '@apis/auth';
import api from '@apis/config';
import { isLoggedInAtom } from '@atoms/auth';
import Button from '@components/Button';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Flex, Popover, Text, TextField } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { vstack } from 'styled-system/patterns';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginEmail,
    onSuccess: ({ data }: { data: { accessToken: string } }) => {
      api.defaults.headers.common['Authorization'] =
        `Bearer ${data.accessToken}`;

      setIsLoggedIn(true);

      router.push('/');
    },
    onError: (error: AxiosError) => {
      alert(
        error.message + '\n' + '\n' + (error.response?.data as any).message
      );
    },
  });

  return (
    <div className={vstack({ marginTop: '20' })}>
      <TextField.Root
        type="text"
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon />
        </TextField.Slot>
      </TextField.Root>

      <TextField.Root
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon />
        </TextField.Slot>
      </TextField.Root>
      <Button onClick={() => mutation.mutate({ email, password })}>
        login
      </Button>
      <Button onClick={() => router.push('/sign-up')}>
        go to the sign-up page
      </Button>
      <Popover.Root>
        <Popover.Trigger>
          <Button className={css({ cursor: 'pointer' })}>Popover</Button>
        </Popover.Trigger>
        <Popover.Content
          width="360px"
          height="400px"
          side="bottom"
          align="center"
          className={css({ bgColor: 'gray.500' })}
        >
          <Flex gap="3">
            <Box flexGrow="1">
              <Text>asdf</Text>
              <Text>asdf</Text>
              <Text>asdf</Text>
            </Box>
          </Flex>
          <Popover.Close>
            <Button size="1">Close</Button>
          </Popover.Close>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

export default Login;
