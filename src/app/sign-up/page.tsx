'use client';

import { registerEmail } from '@apis/auth';
import api from '@apis/config';
import { isLoggedInAtom } from '@atoms/auth';
import Button from '@components/Button';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { vstack } from 'styled-system/patterns';

function SignUp() {
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
      <Button
        variant="soft"
        size="4"
        onClick={() => mutate({ email, password })}
      >
        sign up
      </Button>
      <Button variant="soft" onClick={() => router.push('/login')}>
        go to the login page
      </Button>
    </div>
  );
}

export default SignUp;
