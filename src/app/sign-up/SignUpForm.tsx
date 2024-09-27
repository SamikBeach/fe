'use client';

import { registerEmail } from '@apis/auth';
import api from '@apis/config';
import { isLoggedInAtom } from '@atoms/auth';
import { Button } from '@elements/Button';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { Card, Link, TextField, Text } from '@radix-ui/themes';
import Google from '@svg/google';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { Logo } from '@components/common/Logo';
import { useTranslations } from 'next-intl';

export default function SignUpForm() {
  const [email, setEmail] = useState('');

  const router = useRouter();
  const t = useTranslations('SignUp');

  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const { mutate, isPending } = useMutation({
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

  if (isLoggedIn) {
    router.push('/');

    return;
  }

  return (
    <Card
      className={css({ width: '400px', padding: '40px' })}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          mutate({ email, password: '1234' });
        }
      }}
    >
      <VStack
        className={css({ pt: '20px' })}
        rounded="xl"
        gap="40px"
        width="100%"
      >
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
                  placeholder={t('enter_email')}
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
              </VStack>

              <Button
                onClick={() => mutate({ email, password: '1234' })}
                className={css({ width: '100%' })}
                size="3"
                loading={isPending}
              >
                <Text size="2">{t('sign-up')}</Text>
              </Button>
            </VStack>

            <Button
              variant="outline"
              onClick={() => mutate({ email, password: '1234' })}
              className={css({ width: '100%', color: 'black' })}
              size="2"
            >
              <Google width={16} height={16} />
              {t('continue_with_google')}
            </Button>
          </VStack>

          <VStack>
            <Link href="/login">
              <Text size="2" color="gray">
                {t('forgot_password')}
              </Text>
            </Link>

            <HStack gap="4px">
              <Text size="2" color="gray">
                {t('already_have_account')}
              </Text>
              <Link href="/login">
                <Text
                  size="2"
                  weight="medium"
                  className={css({ color: 'black' })}
                >
                  {t('login')}
                </Text>
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </Card>
  );
}
