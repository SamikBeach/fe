'use client';

import { checkEmailDuplication, signUpWithGoogle } from '@apis/auth';
import { userAtom } from '@atoms/auth';
import { Button } from '@elements/Button';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { Card, Link, TextField, Text, CardProps } from '@radix-ui/themes';
import Google from '@svg/google';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { Logo } from '@components/common/Logo';
import { useTranslations } from 'next-intl';
import {
  FormProvider,
  SubmitHandler,
  useController,
  useForm,
} from 'react-hook-form';
import { getIsValidEmail } from '@utils/common';
import { useGoogleLogin } from '@react-oauth/google';
import api from '@apis/config';
import { useState } from 'react';
import { currentUserAtom, isLoggedInAtom } from '@atoms/user';

interface Props extends CardProps {}

export default function SignUpForm(props: Props) {
  const router = useRouter();
  const t = useTranslations();

  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);

  const setUser = useSetAtom(userAtom);

  const [oauthSignUpErrorMessage, setOauthSignUpErrorMessage] = useState<
    string | undefined
  >(undefined);

  const { mutate: mutateSignUpWithGoogle } = useMutation({
    mutationFn: signUpWithGoogle,
    onSuccess: ({ data }) => {
      api.defaults.headers.common['Authorization'] =
        `Bearer ${data.accessToken}`;

      setCurrentUser(data.user);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      setOauthSignUpErrorMessage(error.response?.data.message);
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async codeResponse => {
      mutateSignUpWithGoogle({ code: codeResponse.code });
    },
    flow: 'auth-code',
  });

  const { mutate: mutateCheckEmailDuplication } = useMutation({
    mutationFn: checkEmailDuplication,
    onError: (error: AxiosError) => {
      // error 코드에 맞게 에러 메시지를 설정
      if (error.response?.status === 401) {
        methods.setError('email', {
          message: t('SignUp.email_already_exists'),
        });
      }
    },
  });

  const methods = useForm<{ email: string }>();

  const {
    field: { value: email, onChange: onEmailChange },
    fieldState: { error },
  } = useController({
    name: 'email',
    control: methods.control,
    defaultValue: '',
  });

  const onSubmit: SubmitHandler<{ email: string }> = data => {
    mutateCheckEmailDuplication(
      { email: data.email },
      {
        onSuccess: () => {
          setUser(prev => ({
            ...prev,
            email,
          }));

          router.push('/sign-up/user-info');
        },
      }
    );
  };

  if (isLoggedIn) {
    router.push('/');

    return;
  }

  return (
    <FormProvider {...methods}>
      <Card className={css({ width: '400px', padding: '40px' })} {...props}>
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
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={css({ width: '100%' })}
              >
                <VStack width="100%">
                  <VStack alignItems="start" width="100%" gap="4px">
                    <TextField.Root
                      value={email}
                      onChange={e => onEmailChange(e.target.value)}
                      type="text"
                      placeholder={t('SignUp.enter_email')}
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
                    {error && (
                      <Text
                        size="1"
                        className={css({ color: 'red' })}
                        role="alert"
                      >
                        {error.message}
                      </Text>
                    )}
                  </VStack>

                  <Button
                    type="submit"
                    className={css({ width: '100%' })}
                    size="3"
                    disabled={!getIsValidEmail(email)}
                  >
                    <Text size="2">{t('SignUp.sign_up')}</Text>
                  </Button>
                </VStack>
              </form>

              <VStack alignItems="start" gap="4px" width="100%">
                <Button
                  variant="outline"
                  onClick={googleLogin}
                  className={css({ width: '100%', color: 'black' })}
                  size="2"
                >
                  <Google width={16} height={16} />
                  {t('SignUp.continue_with_google')}
                </Button>
                {oauthSignUpErrorMessage && (
                  <Text size="1" className={css({ color: 'red' })} role="alert">
                    {oauthSignUpErrorMessage}
                  </Text>
                )}
              </VStack>
            </VStack>

            <VStack gap="0px">
              <HStack gap="4px">
                <Text size="2" color="gray">
                  {t('SignUp.already_have_account')}
                </Text>
                <Link href="/login">
                  <Text
                    size="2"
                    weight="medium"
                    className={css({ color: 'black' })}
                  >
                    {t('SignUp.login')}
                  </Text>
                </Link>
              </HStack>
              <HStack>
                <Link href="/terms-of-service">
                  <Text
                    color="gray"
                    size="1"
                    className={css({
                      cursor: 'pointer',

                      _hover: {
                        textDecoration: 'underline',
                      },
                    })}
                  >
                    {t('Common.terms_of_service')}
                  </Text>
                </Link>
                <Text color="gray" size="1">
                  {' · '}
                </Text>
                <Link href="privacy-policy">
                  <Text
                    color="gray"
                    size="1"
                    className={css({
                      cursor: 'pointer',

                      _hover: {
                        textDecoration: 'underline',
                      },
                    })}
                  >
                    {t('Common.privacy_policy')}
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
