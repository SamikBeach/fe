import { isLoggedInAtom } from '@atoms/auth';
import { useAtomValue } from 'jotai';
import { HStack } from 'styled-system/jsx';
import UserProfileIconButton from './UserProfileIconButton';
import { SearchBar } from './SearchBar';
import { Button } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const BUTTONS = [
  { href: '/login', tKey: 'login' },
  { href: '/sign-up', tKey: 'sign_up' },
];

export default function RightSlot() {
  const pathname = usePathname();
  const t = useTranslations('Common');

  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <HStack gap="20px">
      <SearchBar />
      {isLoggedIn ? (
        <UserProfileIconButton />
      ) : (
        BUTTONS.map(({ href, tKey }) => (
          <Button
            key={href}
            asChild
            variant="ghost"
            className={css({
              color: 'black',
              fontWeight: 'medium',
              backgroundColor: pathname.startsWith(href)
                ? 'gray.100'
                : undefined,
            })}
          >
            <Link href={href}>{t(tKey)}</Link>
          </Button>
        ))
      )}
    </HStack>
  );
}
