import { updateUserInfo } from '@apis/auth';
import { getUserInfoById } from '@apis/user';
import { currentUserAtom } from '@atoms/user';
import { Pencil1Icon } from '@radix-ui/react-icons';
import {
  Avatar,
  Button,
  IconButton,
  Skeleton,
  Text,
  TextField,
} from '@radix-ui/themes';
import { useMutation, useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FormProvider,
  SubmitHandler,
  useController,
  useForm,
} from 'react-hook-form';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface FormValues {
  nickname: string;
}

export default function MobileUserInfo() {
  const t = useTranslations('Common');

  const params = useParams();
  const userId = Number(params.id);

  const currentUser = useAtomValue(currentUserAtom);

  const isMyPage = currentUser != null && currentUser.id === userId;

  const [isNickNameEditMode, setIsNickNameEditMode] = useState(false);

  const {
    data: user,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['user', params.id],
    queryFn: () => getUserInfoById({ userId }),
    select: response => response.data,
  });

  const { mutate: mutateUpdateUserInfo } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      refetchUser();

      setIsNickNameEditMode(false);
    },
  });

  const methods = useForm<FormValues>();

  const {
    field: { value: nickname, onChange: onNicknameChange },
    fieldState: { error: nicknameError },
  } = useController({
    name: 'nickname',
    control: methods.control,
    defaultValue: currentUser?.nickname ?? '',
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

  const onSubmit: SubmitHandler<FormValues> = data => {
    if (currentUser === null) {
      throw new Error('User is not logged in');
    }

    mutateUpdateUserInfo({
      email: currentUser.email,
      nickname: data.nickname,
    });
  };

  useEffect(() => {
    if (user !== undefined) {
      onNicknameChange(user.nickname);
    }
  }, [user, onNicknameChange]);

  return (
    <HStack gap="8px" alignItems="start" px="10px">
      <Avatar radius="full" fallback={nickname[0]} size="2" />
      {isLoading ? (
        <Skeleton height="24px" width="140px" />
      ) : isNickNameEditMode && isMyPage ? (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={css({ width: '100%' })}
          >
            <TextField.Root
              value={nickname}
              onChange={e => onNicknameChange(e.target.value)}
              placeholder={t('nickname_placeholder')}
              className={css({
                width: '300px',
              })}
              onKeyDown={e => {
                if (isNickNameEditMode && e.key === 'Escape') {
                  setIsNickNameEditMode(false);
                }
              }}
              onBlur={e => {
                if (e.relatedTarget?.className.includes('submit-button')) {
                  return;
                }

                setIsNickNameEditMode(false);
              }}
              autoFocus
            >
              <Button
                size="1"
                disabled={nickname === ''}
                className={classNames(
                  css({ cursor: 'pointer', margin: '3px' }),
                  'submit-button'
                )}
              >
                {t('edit')}
              </Button>
            </TextField.Root>
            {nicknameError && (
              <Text size="1" className={css({ color: 'red' })} role="alert">
                {nicknameError.message}
              </Text>
            )}
          </form>
        </FormProvider>
      ) : (
        <HStack>
          <Text weight="bold" size="6">
            {user?.nickname ?? user?.name}
          </Text>
          {isMyPage && (
            <IconButton
              size="3"
              variant="ghost"
              className={css({ cursor: 'pointer' })}
              onClick={() => setIsNickNameEditMode(true)}
            >
              <Pencil1Icon />
            </IconButton>
          )}
        </HStack>
      )}
    </HStack>
  );
}
