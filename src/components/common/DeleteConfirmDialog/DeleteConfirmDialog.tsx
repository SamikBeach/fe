import { AlertDialog, Button } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';
import { toast } from 'react-toastify';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof AlertDialog.Root> {
  onDelete?: () => void;
}

export default function DeleteConfirmDialog({ onDelete, ...props }: Props) {
  const t = useTranslations('Common');

  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Content maxWidth="400px">
        <AlertDialog.Title>{t('delete_confirm')}</AlertDialog.Title>
        <AlertDialog.Description>
          {t('delete_confirm_description')}
        </AlertDialog.Description>
        <HStack mt="30px" justify="end">
          <AlertDialog.Action>
            <Button
              onClick={() => {
                props.onOpenChange?.(false);

                toast.success(t('delete_comment_success_toast'), {
                  position: 'bottom-right',
                  autoClose: 3000,
                  hideProgressBar: true,
                });

                onDelete?.();
              }}
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
              {t('cancel')}
            </Button>
          </AlertDialog.Cancel>
        </HStack>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
