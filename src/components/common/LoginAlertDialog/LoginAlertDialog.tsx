import { AlertDialog, Button } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof AlertDialog.Root> {}

export default function LoginAlertDialog(props: Props) {
  const router = useRouter();
  const t = useTranslations('Common');

  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Content maxWidth="400px">
        <AlertDialog.Title>{t('login_alert')}</AlertDialog.Title>
        <AlertDialog.Description>
          {t('login_alert_description')}
        </AlertDialog.Description>
        <HStack mt="30px" justify="end">
          <AlertDialog.Action>
            <Button
              onClick={() => {
                router.push('/login');
                props.onOpenChange?.(false);
              }}
              className={css({ cursor: 'pointer' })}
            >
              {t('go_to_login')}
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
