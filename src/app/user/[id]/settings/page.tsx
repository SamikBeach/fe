'use client';

import { useTranslations } from 'next-intl';
import { VStack } from 'styled-system/jsx';
import { Button, Text, TextField } from '@radix-ui/themes';
import {
  FormProvider,
  SubmitHandler,
  useController,
  useForm,
} from 'react-hook-form';
import { css } from 'styled-system/css';
import { FaLock } from 'react-icons/fa';
import { changePassword } from '@apis/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DeleteAccountConfirmDialog } from '@components/common/DeleteAccountConfirmDialog';
import { useState } from 'react';

interface FormValues {
  password: string;
  newPassword: string;
}

function SettingsPage() {
  const t = useTranslations('Common');

  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const { mutate: mutateChangePassword } = useMutation({
    mutationFn: changePassword,
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response?.data.message === '비밀번호가 틀렸어요.') {
        methods.setError('password', {
          message: error.response?.data.message,
        });

        return;
      }

      methods.setError('newPassword', {
        message: error.response?.data.message,
      });
    },
    onSuccess: () => {
      methods.reset();
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
    field: { value: newPassword, onChange: onNewPasswordChange },
    fieldState: { error: newPasswordError },
  } = useController({
    name: 'newPassword',
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

  const onSubmit: SubmitHandler<FormValues> = data => {
    mutateChangePassword({
      password: data.password,
      newPassword: data.newPassword,
    });
  };

  return (
    <>
      <VStack>
        <VStack alignItems="start" gap="40px">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className={css({ width: '100%' })}
            >
              <VStack alignItems="start" gap="10px">
                <Text size="4" weight="medium">
                  {t('change_password')}
                </Text>
                <VStack alignItems="start">
                  <VStack alignItems="start" gap="4px">
                    <Text weight="medium" size="2">
                      {t('current_password_label')}
                    </Text>
                    <TextField.Root
                      type="password"
                      value={password}
                      onChange={e => onPasswordChange(e.target.value)}
                      placeholder={t('current_password_placeholder')}
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
                      <Text
                        size="1"
                        className={css({ color: 'red' })}
                        role="alert"
                      >
                        {passwordError.message}
                      </Text>
                    )}
                  </VStack>
                  <VStack alignItems="start" gap="4px">
                    <Text weight="medium" size="2">
                      {t('new_password_label')}
                    </Text>
                    <TextField.Root
                      type="password"
                      value={newPassword}
                      onChange={e => onNewPasswordChange(e.target.value)}
                      placeholder={t('new_password_placeholder')}
                      size="3"
                      className={css({
                        width: '300px',
                      })}
                    >
                      <TextField.Slot>
                        <FaLock color="gray" />
                      </TextField.Slot>
                    </TextField.Root>
                    {newPasswordError && (
                      <Text
                        size="1"
                        className={css({ color: 'red' })}
                        role="alert"
                      >
                        {newPasswordError.message}
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
                    disabled={password.length === 0 || newPassword.length === 0}
                  >
                    {t('change')}
                  </Button>
                </VStack>
              </VStack>
            </form>
          </FormProvider>

          <VStack alignItems="start" gap="4px" width="100%">
            <Text size="4" weight="medium">
              {t('delete_account')}
            </Text>
            <Button
              size="3"
              color="red"
              className={css({ width: '100%', cursor: 'pointer' })}
              onClick={() => setOpenDeleteAccountDialog(true)}
            >
              {t('delete_account')}
            </Button>
          </VStack>
        </VStack>
      </VStack>
      <DeleteAccountConfirmDialog
        open={openDeleteAccountDialog}
        onOpenChange={setOpenDeleteAccountDialog}
      />
    </>
  );
}

export default SettingsPage;
