import { isLoggedInAtom } from '@atoms/auth';
import { SearchBar } from '@components/SearchBar';
import { Button } from '@elements/Button';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import UserProfileIconButton from './UserProfileIconButton';

export default function RightSlot() {
  const router = useRouter();

  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <HStack gap="30px">
      <SearchBar />
      {isLoggedIn ? (
        <UserProfileIconButton />
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
