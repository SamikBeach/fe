import { Header } from '@components/common/Header';
import { ReactQueryProvider } from '@components/common/ReactQueryProvider';
import { Theme } from '@radix-ui/themes';
import { ReactNode } from 'react';
import { css } from 'styled-system/css';
import NextTopLoader from 'nextjs-toploader';
import { GoogleOAuthProvider } from '@react-oauth/google';

import '@styles/globals.css';

export const metadata = {
  title: 'samik beach',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader
          color="black"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          easing="ease"
          speed={200}
          shadow={false}
          showSpinner={false}
          zIndex={1600}
          showAtBottom={false}
        />
        <Theme accentColor="gray" radius="large">
          <GoogleOAuthProvider
            clientId={process.env.GOOGLE_OAUTH_CLIENT_ID ?? ''}
          >
            <ReactQueryProvider>
              <main
                className={css({
                  bgColor: 'white',
                })}
              >
                <Header />
                {children}
              </main>
            </ReactQueryProvider>
          </GoogleOAuthProvider>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
