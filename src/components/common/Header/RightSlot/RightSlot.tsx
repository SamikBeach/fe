import { isLoggedInAtom } from '@atoms/auth';
import { Button } from '@elements/Button';
import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import UserProfileIconButton from './UserProfileIconButton';
import Link from 'next/link';
import { SearchBar } from './SearchBar';

const BUTTONS = [
  { href: '/login', label: 'Log in' },
  { href: '/sign-up', label: 'Sign up' },
];

export default function RightSlot() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <HStack gap="30px">
      <SearchBar />
      {isLoggedIn ? (
        <UserProfileIconButton />
      ) : (
        <HStack gap="20px">
          {BUTTONS.map(({ href, label }) => (
            <Button
              key={href}
              asChild
              variant="ghost"
              className={css({ color: 'black', fontWeight: 'medium' })}
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </HStack>
      )}
    </HStack>
  );
}
