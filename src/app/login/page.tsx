'use client';

import Button from '@components/Button';
import { Box, Flex, Popover, Text } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { jwtAtom } from 'src/atoms';
import { userIdAtom } from 'src/atoms/user';
import { css } from 'styled-system/css';
import { vstack } from 'styled-system/patterns';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setJwt = useSetAtom(jwtAtom);
  const setUserId = useSetAtom(userIdAtom);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) => {
      console.log(
        'process.env.NEXT_PUBLIC_SERVER_URL',
        process.env.NEXT_PUBLIC_SERVER_URL
      );
      return axios.post('/user/login', payload, {
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      });
    },
    onSuccess: data => {
      setJwt(data.data.jwt);
      setUserId(data.data.id);

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
      <input
        type="text"
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <Button onClick={() => mutation.mutate({ email, password })}>
        login
      </Button>
      <Button onClick={() => router.push('/sign-up')}>
        go to the sign-up page
      </Button>
      <Popover.Root>
        <Popover.Trigger>
          <Button>Popover</Button>
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
