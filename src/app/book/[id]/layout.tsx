import { Header } from '@components/Header';
import ReactQueryProviders from '@components/common/ReactQueryProviders';
import { Theme, ThemePanel } from '@radix-ui/themes';
import '@styles/globals.css';

import { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <VStack className={css({ bgColor: 'white', py: '40px' })}>
      {children}
    </VStack>
  );
}
