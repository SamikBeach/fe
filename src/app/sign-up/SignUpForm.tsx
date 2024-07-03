'use client';

import { registerEmail } from '@apis/auth';
import api from '@apis/config';
import { isLoggedInAtom } from '@atoms/auth';
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

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  const { mutate } = useMutation({
    mutationFn: registerEmail,
    onSuccess: ({ data }) => {
      router.push('/');

      api.defaults.headers.common['Authorization'] =
        `Bearer ${data.accessToken}`;

      setIsLoggedIn(true);
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
      >
        <TextField.Root
          type="text"
          placeholder="email"
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
          placeholder="Password"
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
          Sign up
        </Button>

        <Link
          href="/login"
          className={css({
            color: 'black',
          })}
        >
          Go to the login page
        </Link>
      </VStack>
    </Card>
  );
}
