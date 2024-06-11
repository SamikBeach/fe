import '../styles/globals.css';

import { ReactNode } from 'react';
import ReactQueryProviders from 'src/hooks/useReactQuery';

export const metadata = {
  title: 'samik beach',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div>layout</div>
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  );
}