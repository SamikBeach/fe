import { isLoggedInAtom } from 'legacy_src/atoms/auth';
import { DropdownMenu, IconButton } from '@radix-ui/themes';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';

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
        >
          My page
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={() => {
            setIsLoggedIn(false);
            router.push('/login');
          }}
        >
          Log out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
