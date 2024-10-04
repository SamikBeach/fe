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
import { HStack, VStack } from 'styled-system/jsx';

interface FormValues {
  nickname: string;
}

export default function UserInfo() {
  const t = useTranslations('Common');

  const params = useParams();
  const userId = Number(params.id);

  const currentUser = useAtomValue(currentUserAtom);

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
    <VStack gap="20px" width="260px" alignItems="start" pt="30px">
      <Avatar
        radius="full"
        fallback="B"
        size="9"
        className={css({
          width: '260px',
          height: '260px',
          margin: '0 auto',
        })}
      />
      {isLoading ? (
        <Skeleton height="24px" width="140px" />
      ) : isNickNameEditMode ? (
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
              autoFocus
            >
              <Button
                size="1"
                disabled={nickname === ''}
                className={css({ cursor: 'pointer', margin: '3px' })}
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
          <IconButton
            size="3"
            variant="ghost"
            className={css({ cursor: 'pointer' })}
            onClick={() => setIsNickNameEditMode(true)}
          >
            <Pencil1Icon />
          </IconButton>
        </HStack>
      )}
    </VStack>
  );
}
