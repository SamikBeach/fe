import '@styles/globals.css';

import { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

export default function Layout({ children }: { children: ReactNode }) {
  return <VStack className={css({ bgColor: 'white' })}>{children}</VStack>;
}
