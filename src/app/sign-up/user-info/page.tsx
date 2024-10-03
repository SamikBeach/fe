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
import { IoMdPerson } from 'react-icons/io';
import { FaLock } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { registerUserInfo, sendEmailVerificationCode } from '@apis/auth';
import { useAtomValue } from 'jotai';
import { userAtom } from '@atoms/auth';
import { useRouter } from 'next/navigation';

interface FormValues {
  nickname: string;
  password: string;
  passwordConfirm: string;
}

function UserInfoPage() {
  const t = useTranslations('Common');

  const router = useRouter();

  const user = useAtomValue(userAtom);

  const { mutate: mutateSendEmailVerificationCode } = useMutation({
    mutationFn: sendEmailVerificationCode,
    onSuccess: () => {
      router.push('/sign-up/authentication');
    },
  });

  const { mutate: mutateRegisterUserInfo } = useMutation({
    mutationFn: registerUserInfo,
    onSuccess: () => {
      mutateSendEmailVerificationCode({ email: user.email });
    },
  });

  const methods = useForm<FormValues>();

  const {
    field: { value: nickname, onChange: onNicknameChange },
    fieldState: { error: nicknameError },
  } = useController({
    name: 'nickname',
    control: methods.control,
    defaultValue: '',
    rules: {
      required: {
        value: true,
        message: t('nickname_required'),
      },
      maxLength: {
        value: 20,
        message: t('nickname_length_error', { length: 20 }),
      },
    },
  });

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
    mutateRegisterUserInfo({
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
              {t('nickname_label')}
            </Text>
            <TextField.Root
              value={nickname}
              onChange={e => onNicknameChange(e.target.value)}
              placeholder={t('nickname_placeholder')}
              size="3"
              className={css({
                width: '300px',
              })}
            >
              <TextField.Slot>
                <IoMdPerson color="gray" />
              </TextField.Slot>
            </TextField.Root>
            {nicknameError && (
              <Text size="1" className={css({ color: 'red' })} role="alert">
                {nicknameError.message}
              </Text>
            )}
          </VStack>
          <VStack alignItems="start" gap="4px">
            <Text weight="medium" size="2">
              {t('password_label')}
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
            disabled={
              nickname.length === 0 ||
              password.length === 0 ||
              passwordConfirm.length === 0
            }
          >
            {t('submit')}
          </Button>
        </VStack>
      </form>
    </FormProvider>
  );
}

export default UserInfoPage;
