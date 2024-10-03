'use client';
import { verifyCode } from '@apis/auth';
import { userAtom } from '@atoms/auth';
import { TextField, Text, Button } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtomValue } from 'jotai';
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

function AuthenticationPage() {
  const t = useTranslations('Common');

  const router = useRouter();

  const user = useAtomValue(userAtom);

  const { mutate: mutateVerifyCode, isIdle } = useMutation({
    mutationFn: verifyCode,
    onSuccess: () => {
      router.push('/');
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        methods.setError('verificationCode', {
          message: t('verification_code_not_match'),
        });
      }
    },
  });

  const methods = useForm<{ verificationCode: number }>();

  const {
    field: { value: verificationCode, onChange: onVerificationCodeChange },
    fieldState: { error },
  } = useController({
    name: 'verificationCode',
    control: methods.control,
    defaultValue: undefined,
  });

  const onSubmit: SubmitHandler<{ verificationCode: number }> = data => {
    mutateVerifyCode({
      email: user.email,
      verificationCode: data.verificationCode,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={css({ width: '100%' })}
      >
        <VStack alignItems="start">
          <VStack alignItems="start" gap="2px">
            <Text weight="bold">{t('verification_code_description')}</Text>
            <TextField.Root
              value={verificationCode}
              onChange={e => onVerificationCodeChange(Number(e.target.value))}
              size="3"
              className={css({
                width: '300px',
              })}
            >
              <Button
                disabled={
                  verificationCode === undefined ||
                  verificationCode.toString().length !== 6
                }
                className={css({ cursor: 'pointer', margin: '3px' })}
              >
                {t('send')}
              </Button>
            </TextField.Root>
            {error && (
              <Text size="1" className={css({ color: 'red' })} role="alert">
                {error.message}
              </Text>
            )}
          </VStack>
        </VStack>
      </form>
    </FormProvider>
  );
}

export default AuthenticationPage;
