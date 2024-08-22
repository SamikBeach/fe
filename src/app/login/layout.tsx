import { ReactNode } from 'react';
import { css } from 'styled-system/css';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div
      className={css({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
      })}
    >
      {children}
    </div>
  );
}
