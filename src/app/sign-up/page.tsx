'use client';

import Button from '@components/Button';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { vstack } from 'styled-system/patterns';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (payload: {
      name: string;
      email: string;
      password: string;
    }) => {
      return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, payload);
    },
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error: AxiosError) => {
      alert(
        error.message +
          '\n' +
          '\n' +
          (error.response?.data as any).message.join(', \n')
      );
    },
  });

  return (
    <div className={vstack({ marginTop: '20' })}>
      <input
        type="text"
        placeholder="name"
        onChange={e => setName(e.target.value)}
      />
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
      <Button
        variant="soft"
        size="4"
        onClick={() => mutate({ name, email, password })}
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
