'use client';

import { loginEmail } from '@apis/auth';
import api from '@apis/config';
import { isLoggedInAtom } from '@atoms/auth';
import { Logo } from '@components/Logo';
import { Button } from '@elements/Button';
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { Card, Link, TextField, Text } from '@radix-ui/themes';
import Google from '@svg/google';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  const router = useRouter();

  const { mutate, isPending } = useMutation({
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
    <Card
      className={css({ width: '400px', padding: '40px' })}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          mutate({ email, password });
        }
      }}
    >
      <VStack className={css({ pt: '20px' })} rounded="xl" gap="40px">
        <Logo
          width="80px"
          onClick={() => router.push('/')}
          className={css({ cursor: 'pointer' })}
        />

        <VStack gap="30px" width="100%">
          <VStack gap="20px" width="100%">
            <VStack width="100%">
              <VStack width="100%">
                <TextField.Root
                  type="text"
                  placeholder="Enter email"
                  onChange={e => setEmail(e.target.value)}
                  size="3"
                  className={css({
                    width: '100%',
                    fontSize: '14px',
                  })}
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
                  className={css({
                    width: '100%',
                    fontSize: '14px',
                  })}
                >
                  <TextField.Slot>
                    <LockClosedIcon />
                  </TextField.Slot>
                </TextField.Root>
              </VStack>

              <Button
                onClick={() => mutate({ email, password })}
                className={css({ width: '100%' })}
                size="3"
                loading={isPending}
              >
                <Text size="2">Log in</Text>
              </Button>
            </VStack>

            <Button
              variant="outline"
              onClick={() => mutate({ email, password })}
              className={css({ width: '100%', color: 'black' })}
              size="2"
            >
              <Google width={16} height={16} />
              Continue with Google
            </Button>
          </VStack>

          <VStack>
            <Link href="/login">
              <Text size="2" color="gray">
                Forgot your password?
              </Text>
            </Link>

            <HStack gap="4px">
              <Text size="2" color="gray">
                No Account?
              </Text>
              <Link href="/sign-up">
                <Text
                  size="2"
                  weight="medium"
                  className={css({ color: 'black' })}
                >
                  Sign Up
                </Text>
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </Card>
  );
}
