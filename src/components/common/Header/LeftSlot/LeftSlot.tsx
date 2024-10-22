import { usePathname } from 'next/navigation';
import { css } from 'styled-system/css';
import { Logo } from '../../Logo';
import { HStack } from 'styled-system/jsx';
import Link from 'next/link';
import MenuButton from './MenuButton';
import { useTranslations } from 'next-intl';
import { BREAKPOINTS } from '@constants/index';
import dynamic from 'next/dynamic';

const MediaQuery = dynamic(() => import('react-responsive'), {
  ssr: false,
});

const MENU_ITEMS = [
  { href: '/authors', tKey: 'authors' },
  { href: '/original-works', tKey: 'original_works' },
  { href: '/editions', tKey: 'editions' },
];

export default function LeftSlot() {
  const t = useTranslations('Common');

  const pathname = usePathname();

  return (
    <>
      <MediaQuery minWidth={BREAKPOINTS.md}>
        <HStack gap="40px">
          <Link href="/">
            <Logo className={css({ cursor: 'pointer' })} />
          </Link>

          <HStack gap="30px">
            {MENU_ITEMS.map(({ href, tKey }) => (
              <MenuButton
                key={href}
                className={css({
                  backgroundColor: pathname.startsWith(href)
                    ? 'gray.100'
                    : undefined,
                })}
              >
                <Link href={href}>{t(tKey)}</Link>
              </MenuButton>
            ))}
          </HStack>
        </HStack>
      </MediaQuery>
      <MediaQuery maxWidth={BREAKPOINTS.md}>
        {/* 햄버거 버튼 */}
        <MenuButton>
          <Logo className={css({ cursor: 'pointer' })} />
        </MenuButton>
      </MediaQuery>
    </>
  );
}
