import { isLoggedInAtom } from '@atoms/auth';
import { Button } from '@elements/Button';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Avatar, DropdownMenu, IconButton, TextField } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

export default function RightSlot() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  return (
    <HStack gap="30px">
      <TextField.Root
        placeholder="Search books, authors..."
        className={css({ width: '250px' })}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      {isLoggedIn ? (
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
                setIsLoggedIn(false);
                router.push('/login');
              }}
            >
              Log out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <HStack gap="14px">
          <Button
            variant="ghost"
            className={css({ color: 'black', fontWeight: 'medium' })}
            onClick={() => router.push('/login')}
          >
            Log in
          </Button>
          <Button
            variant="soft"
            onClick={() => router.push('/sign-up')}
            className={css({ color: 'black', fontWeight: 'medium' })}
          >
            Sign up
          </Button>
        </HStack>
      )}
    </HStack>
  );
}
