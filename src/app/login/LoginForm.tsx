'use client';

import { loginEmail, loginWithGoogle } from '@apis/auth';
import api from '@apis/config';
import { currentUserAtom, isLoggedInAtom } from '@atoms/user';
import { Logo } from '@components/common/Logo';
import { Button } from '@elements/Button';
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { Card, Link, TextField, Text } from '@radix-ui/themes';
import { useGoogleLogin } from '@react-oauth/google';
import Google from '@svg/google';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  SubmitHandler,
  useController,
  useForm,
  FormProvider,
} from 'react-hook-form';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const t = useTranslations('Login');

  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);

  const router = useRouter();

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationFn: loginEmail,
    onSuccess: ({ data }) => {
      api.defaults.headers.common['Authorization'] =
        `Bearer ${data.accessToken}`;

      setCurrentUser(data.user);

      router.push('/');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      methods.setError('password', {
        message: error.response?.data.message,
      });
    },
  });

  const { mutate: mutateLoginWithGoogle } = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: ({ data }) => {
      api.defaults.headers.common['Authorization'] =
        `Bearer ${data.accessToken}`;

      setCurrentUser(data.user);
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => {
      mutateLoginWithGoogle({ code: codeResponse.code });
    },
    flow: 'auth-code',
  });

  const methods = useForm<FormValues>();

  const {
    field: { value: email, onChange: onEmailChange },
    fieldState: { error: emailError },
  } = useController({
    name: 'email',
    control: methods.control,
    defaultValue: '',
  });

  const {
    field: { value: password, onChange: onPasswordChange },
    fieldState: { error: passwordError },
  } = useController({
    name: 'password',
    control: methods.control,
    defaultValue: '',
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    mutateLogin({ email: data.email, password: data.password });
  };

  if (isLoggedIn) {
    router.push('/');

    return;
  }

  return (
    <FormProvider {...methods}>
      <Card className={css({ width: '400px', padding: '40px' })}>
        <VStack className={css({ pt: '20px' })} rounded="xl" gap="40px">
          <Logo
            width="80px"
            onClick={() => router.push('/')}
            className={css({ cursor: 'pointer' })}
          />

          <VStack gap="30px" width="100%">
            <VStack gap="20px" width="100%">
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={css({ width: '100%' })}
              >
                <VStack width="100%">
                  <VStack width="100%">
                    <VStack alignItems="start" width="100%" gap="4px">
                      <TextField.Root
                        placeholder={t('enter_email')}
                        value={email}
                        onChange={e => onEmailChange(e.target.value)}
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
                      {emailError && (
                        <Text
                          size="1"
                          className={css({ color: 'red' })}
                          role="alert"
                        >
                          {emailError.message}
                        </Text>
                      )}
                    </VStack>

                    <VStack alignItems="start" width="100%" gap="4px">
                      <TextField.Root
                        type="password"
                        value={password}
                        placeholder={t('enter_password')}
                        onChange={e => onPasswordChange(e.target.value)}
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
                      {passwordError && (
                        <Text
                          size="1"
                          className={css({ color: 'red' })}
                          role="alert"
                        >
                          {passwordError.message}
                        </Text>
                      )}
                    </VStack>
                  </VStack>

                  <Button
                    type="submit"
                    className={css({ width: '100%' })}
                    size="3"
                    loading={isPending}
                  >
                    <Text size="2">{t('login')}</Text>
                  </Button>
                </VStack>
              </form>

              <Button
                variant="outline"
                onClick={googleLogin}
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
                  {t('no_account')}
                </Text>
                <Link href="/sign-up">
                  <Text
                    size="2"
                    weight="medium"
                    className={css({ color: 'black' })}
                  >
                    {t('sign_up')}
                  </Text>
                </Link>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </Card>
    </FormProvider>
  );
}
