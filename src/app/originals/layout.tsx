import { ReactNode } from 'react';
import { css } from 'styled-system/css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        position: 'relative',
        bgColor: 'gray.50',
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
      })}
    >
      {children}
    </div>
  );
}
