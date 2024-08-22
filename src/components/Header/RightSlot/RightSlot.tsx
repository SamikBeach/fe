import { isLoggedInAtom } from '@atoms/auth';
// import { SearchBar } from '@components/SearchBar';
import { Button } from '@elements/Button';
import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import UserProfileIconButton from './UserProfileIconButton';
import Link from 'next/link';

export default function RightSlot() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <HStack gap="30px">
      {/* <SearchBar /> */}
      {isLoggedIn ? (
        <UserProfileIconButton />
      ) : (
        <HStack gap="20px">
          <Button
            asChild
            variant="ghost"
            className={css({ color: 'black', fontWeight: 'medium' })}
          >
            <Link href="/login">Log in</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={css({ color: 'black', fontWeight: 'medium' })}
          >
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </HStack>
      )}
    </HStack>
  );
}
