import '@styles/globals.css';

import { ReactNode } from 'react';
import { VStack } from 'styled-system/jsx';

export default function Layout({ children }: { children: ReactNode }) {
  return <VStack pt="64px">{children}</VStack>;
}
