import { isLoggedInAtom } from 'legacy_src/atoms/auth';
import { SearchBar } from 'legacy_src/components/SearchBar';
import { Button } from 'legacy_src/elements/Button';
import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import UserProfileIconButton from './UserProfileIconButton';
import Link from 'next/link';

export default function RightSlot() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <HStack gap="30px">
      <SearchBar />
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
