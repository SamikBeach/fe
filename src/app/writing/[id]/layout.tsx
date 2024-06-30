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
