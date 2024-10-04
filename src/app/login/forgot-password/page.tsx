'use client';
import { sendPasswordResetEmail } from '@apis/auth';
import { userAtom } from '@atoms/auth';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { TextField, Text, Button } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { getIsValidEmail } from '@utils/common';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  FormProvider,
  SubmitHandler,
  useController,
  useForm,
} from 'react-hook-form';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

interface FormValues {
  email: string;
}

function ForgotPasswordPage() {
  const router = useRouter();

  const t = useTranslations('Login');

  const setUser = useSetAtom(userAtom);

  const { mutate: mutateSendPasswordResetEmail } = useMutation({
    mutationFn: sendPasswordResetEmail,
    onSuccess: () => {
      router.push('/login/authentication');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      methods.setError('email', {
        message: error.response?.data.message,
      });
    },
  });

  const methods = useForm<FormValues>();

  const {
    field: { value: email, onChange: onEmailChange },
    fieldState: { error },
  } = useController({
    name: 'email',
    control: methods.control,
    defaultValue: undefined,
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    setUser(prev => ({ ...prev, email: data.email }));
    mutateSendPasswordResetEmail({ email: data.email });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <VStack alignItems="start" width="400px" gap="6px">
          <Text weight="bold">{t('reset_password_description')}</Text>
          <TextField.Root
            value={email}
            onChange={e => onEmailChange(e.target.value)}
            type="text"
            placeholder={t('enter_email')}
            size="3"
            className={css({
              width: '100%',
              fontSize: '14px',
            })}
          >
            <TextField.Slot>
              <EnvelopeClosedIcon />
            </TextField.Slot>
            <Button
              disabled={!getIsValidEmail(email)}
              className={css({ cursor: 'pointer', margin: '3px' })}
            >
              {t('submit')}
            </Button>
          </TextField.Root>
          {error && (
            <Text size="1" className={css({ color: 'red' })} role="alert">
              {error.message}
            </Text>
          )}
        </VStack>
      </form>
    </FormProvider>
  );
}

export default ForgotPasswordPage;
