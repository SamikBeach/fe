'use client';
import { isLoggedInAtom } from '@atoms/auth';
import { DropdownMenu, IconButton } from '@radix-ui/themes';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { googleLogout } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@apis/auth';
import { currentUserAtom } from '@atoms/user';
import { useTranslations } from 'next-intl';

export default function UserProfileIconButton() {
  const t = useTranslations('Common');

  const currentUser = useAtomValue(currentUserAtom);
  const router = useRouter();

  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsLoggedIn(false);
      googleLogout();
    },
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          radius="full"
          className={css({ cursor: 'pointer', fontSize: '12px' })}
        >
          B
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          onSelect={() => {
            router.push(`/user/${currentUser?.id}`);
          }}
          className={css({ cursor: 'pointer' })}
        >
          {t('my_page')}
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={() => {
            mutate();
          }}
          className={css({ cursor: 'pointer' })}
        >
          {t('log_out')}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
