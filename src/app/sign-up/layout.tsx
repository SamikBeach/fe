import { ReactNode } from 'react';
import { Center } from 'styled-system/jsx/center';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <Center height="600px">{children}</Center>;
}
