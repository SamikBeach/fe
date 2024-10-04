'use client';
import { TextField, Text, Button } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import {
  FormProvider,
  SubmitHandler,
  useController,
  useForm,
} from 'react-hook-form';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import { FaLock } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { updateUserInfo } from '@apis/auth';
import { useAtomValue } from 'jotai';
import { userAtom } from '@atoms/auth';
import { useRouter } from 'next/navigation';

interface FormValues {
  nickname: string;
  password: string;
  passwordConfirm: string;
}

function UpdatePasswordPage() {
  const t = useTranslations('Common');

  const router = useRouter();

  const user = useAtomValue(userAtom);

  const { mutate: mutateUpdateUserInfo } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      router.push('/login');
    },
  });

  const methods = useForm<FormValues>();

  const {
    field: { value: password, onChange: onPasswordChange },
    fieldState: { error: passwordError },
  } = useController({
    name: 'password',
    control: methods.control,
    defaultValue: '',
    rules: {
      required: {
        value: true,
        message: t('password_required'),
      },
      minLength: {
        value: 8,
        message: t('password_length_error', { length: 8 }),
      },
    },
  });

  const {
    field: { value: passwordConfirm, onChange: onPasswordConfirmChange },
    fieldState: { error: passwordConfirmError },
  } = useController({
    name: 'passwordConfirm',
    control: methods.control,
    defaultValue: '',
    rules: {
      required: {
        value: true,
        message: t('password_required'),
      },
      minLength: {
        value: 8,
        message: t('password_length_error', { length: 8 }),
      },
      validate: value => {
        if (value !== password) {
          return t('password_confirm_error');
        }
      },
    },
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    mutateUpdateUserInfo({
      email: user.email,
      nickname: data.nickname,
      password: data.password,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={css({ width: '100%' })}
      >
        <VStack alignItems="start">
          <VStack alignItems="start" gap="4px">
            <Text weight="medium" size="2">
              {t('new_password_label')}
            </Text>
            <TextField.Root
              type="password"
              value={password}
              onChange={e => onPasswordChange(e.target.value)}
              placeholder={t('password_placeholder')}
              size="3"
              className={css({
                width: '300px',
              })}
            >
              <TextField.Slot>
                <FaLock color="gray" />
              </TextField.Slot>
            </TextField.Root>
            {passwordError && (
              <Text size="1" className={css({ color: 'red' })} role="alert">
                {passwordError.message}
              </Text>
            )}
          </VStack>
          <VStack alignItems="start" gap="4px">
            <Text weight="medium" size="2">
              {t('password_confirm_label')}
            </Text>
            <TextField.Root
              type="password"
              value={passwordConfirm}
              onChange={e => onPasswordConfirmChange(e.target.value)}
              placeholder={t('password_placeholder')}
              size="3"
              className={css({
                width: '300px',
              })}
            >
              <TextField.Slot>
                <FaLock color="gray" />
              </TextField.Slot>
            </TextField.Root>
            {passwordConfirmError && (
              <Text size="1" className={css({ color: 'red' })} role="alert">
                {passwordConfirmError.message}
              </Text>
            )}
          </VStack>
          <Button
            size="3"
            className={css({
              width: '100%',
              cursor: 'pointer',
              fontSize: '14px',
            })}
            disabled={password.length === 0 || passwordConfirm.length === 0}
          >
            {t('submit')}
          </Button>
        </VStack>
      </form>
    </FormProvider>
  );
}

export default UpdatePasswordPage;
