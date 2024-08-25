import { isLoggedInAtom } from '@atoms/auth';
import { DropdownMenu, IconButton } from '@radix-ui/themes';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { googleLogout } from '@react-oauth/google';

export default function UserProfileIconButton() {
  const router = useRouter();

  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

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
            router.push('/my-page');
          }}
          className={css({ cursor: 'pointer' })}
        >
          My page
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={() => {
            googleLogout();
            setIsLoggedIn(false);
          }}
          className={css({ cursor: 'pointer' })}
        >
          Log out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
