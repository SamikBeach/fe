'use client';

import { loginEmail } from '@apis/auth';
import api from '@apis/config';
import { isLoggedInAtom } from '@atoms/auth';
import { Logo } from '@components/Logo';
import { Button } from '@elements/Button';
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { Card, Link, TextField } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: loginEmail,
    onSuccess: ({ data }) => {
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
    <Card>
      <VStack
        className={css({ bgColor: 'white', py: '40px', width: '400px' })}
        rounded="xl"
        gap="40px"
      >
        <Logo
          width="80px"
          onClick={() => router.push('/')}
          className={css({ cursor: 'pointer' })}
        />

        <VStack>
          <TextField.Root
            type="text"
            placeholder="Enter email"
            onChange={e => setEmail(e.target.value)}
            size="3"
            className={css({ width: '300px' })}
          >
            <TextField.Slot>
              <EnvelopeClosedIcon />
            </TextField.Slot>
          </TextField.Root>

          <TextField.Root
            type="password"
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
            size="3"
            className={css({ width: '300px' })}
          >
            <TextField.Slot>
              <LockClosedIcon />
            </TextField.Slot>
          </TextField.Root>

          <Button
            onClick={() => mutate({ email, password })}
            className={css({ width: '300px' })}
            size="3"
          >
            Log in
          </Button>

          <Link
            href="/sign-up"
            className={css({
              color: 'black',
            })}
          >
            Go to the sign up page
          </Link>
        </VStack>
      </VStack>
    </Card>
  );
}
