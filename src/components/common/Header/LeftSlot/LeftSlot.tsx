/* eslint-disable react-hooks/rules-of-hooks */
import { usePathname } from 'next/navigation';
import { css } from 'styled-system/css';
import { Logo } from '../../Logo';
import { HStack, VStack } from 'styled-system/jsx';
import Link from 'next/link';
import MenuButton from './MenuButton';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import { Text, IconButton } from '@radix-ui/themes';
import { RxHamburgerMenu } from 'react-icons/rx';

import 'react-modern-drawer/dist/index.css';
import { MediaContextProvider, Media } from '@app/media';

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
      <MediaContextProvider>
        <Media greaterThanOrEqual="lg">
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
        </Media>

        <Media lessThan="lg">
          <IconButton
            onClick={() => {
              setIsOpenSidebar(true);
            }}
            variant="outline"
            className={css({ cursor: 'pointer' })}
          >
            <RxHamburgerMenu />
          </IconButton>
          <Drawer
            open={isOpenSidebar}
            onClose={() => setIsOpenSidebar(false)}
            direction="left"
            style={{
              width: '70vw',
              padding: '20px',
            }}
            duration={200}
          >
            <VStack alignItems="start" gap="20px">
              <Logo />
              <VStack alignItems="start" gap="0" width="100%">
                {MENU_ITEMS.map(({ href, tKey }) => (
                  <Link
                    key={href}
                    href={href}
                    className={css({ width: '100%' })}
                  >
                    <div
                      className={css({
                        width: '100%',
                        borderRadius: '6px',
                        padding: '10px',

                        _hover: {
                          backgroundColor: 'gray.100',
                        },
                      })}
                      onClick={() => setIsOpenSidebar(false)}
                    >
                      <Text weight="medium" size="4">
                        {t(tKey)}
                      </Text>
                    </div>
                  </Link>
                ))}
              </VStack>
            </VStack>
          </Drawer>
        </Media>
      </MediaContextProvider>
    </>
  );
}
