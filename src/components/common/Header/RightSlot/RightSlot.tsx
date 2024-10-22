import { useAtomValue } from 'jotai';
import { HStack } from 'styled-system/jsx';
import UserProfileIconButton from './UserProfileIconButton';
import { SearchBar } from './SearchBar';
import { Button } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { isLoggedInAtom } from '@atoms/user';
import { Media } from '@app/media';

const BUTTONS = [
  { href: '/login', tKey: 'login' },
  { href: '/sign-up', tKey: 'sign_up' },
];

export default function RightSlot() {
  const pathname = usePathname();
  const t = useTranslations('Common');

  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <HStack gap="20px" width="100%" justify="end">
      <Media greaterThanOrEqual="lg">
        <SearchBar />
      </Media>
      <Media lessThan="lg" className={css({ width: '100%' })}>
        <SearchBar className={css({ width: '100%' })} />
      </Media>
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
