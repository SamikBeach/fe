import { usePathname } from 'next/navigation';
import { css } from 'styled-system/css';
import { Logo } from '../../Logo';
import { HStack } from 'styled-system/jsx';
import Link from 'next/link';
import MenuButton from './MenuButton';
import { useTranslations } from 'next-intl';
import { BREAKPOINTS } from '@constants/index';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import { ChevronDownIcon, IconButton } from '@radix-ui/themes';
import 'react-modern-drawer/dist/index.css';

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

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

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
        <IconButton
          onClick={() => {
            console.log('clicked');
            setIsOpenSidebar(true);
          }}
        >
          <ChevronDownIcon onClick={() => setIsOpenSidebar(true)} />
        </IconButton>
        <Drawer
          open={isOpenSidebar}
          onClose={() => setIsOpenSidebar(prev => !prev)}
          direction="left"
        >
          <div>Hello World</div>
        </Drawer>
      </MediaQuery>
    </>
  );
}
