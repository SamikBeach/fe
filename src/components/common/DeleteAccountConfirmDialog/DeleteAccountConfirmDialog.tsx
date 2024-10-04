import { deleteAccount } from '@apis/auth';
import api from '@apis/config';
import { currentUserAtom } from '@atoms/user';
import { AlertDialog, Button } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof AlertDialog.Root> {
  onDelete?: () => void;
}

export default function DeleteAccountConfirmDialog({
  onDelete,
  ...props
}: Props) {
  const t = useTranslations('Common');

  const router = useRouter();
  const setCurrentUser = useSetAtom(currentUserAtom);

  const { mutate: mutateDeleteAccount } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      setCurrentUser(null);
      api.defaults.headers.common['Authorization'] = undefined;

      router.push('/');
    },
  });

  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Content maxWidth="400px">
        <AlertDialog.Title>{t('delete_account_confirm')}</AlertDialog.Title>
        <AlertDialog.Description>
          {t('delete_account_confirm_description')}
        </AlertDialog.Description>
        <HStack mt="30px" justify="end">
          <AlertDialog.Action>
            <Button
              onClick={() => {
                mutateDeleteAccount();

                onDelete?.();
                props.onOpenChange?.(false);
              }}
              color="red"
              className={css({ cursor: 'pointer' })}
            >
              {t('delete')}
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button
              variant="outline"
              onClick={() => {
                props.onOpenChange?.(false);
              }}
              className={css({ cursor: 'pointer' })}
            >
              {t('close')}
            </Button>
          </AlertDialog.Cancel>
        </HStack>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
