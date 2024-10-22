import { Header } from '@components/common/Header';
import { ReactQueryProvider } from '@components/common/ReactQueryProvider';
import { Theme } from '@radix-ui/themes';
import { ReactNode } from 'react';
import { css } from 'styled-system/css';
import NextTopLoader from 'nextjs-toploader';
import { GoogleOAuthProvider } from '@react-oauth/google';

import '@styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import SilentRefresh from './SilentRefresh';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { cookies } from 'next/headers';
import RootHead from './RootHead';

export const metadata = {
  title: 'samik beach',
  description: 'Generated by Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html>
      <RootHead />
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
              <NextIntlClientProvider messages={messages}>
                <main
                  className={css({
                    bgColor: 'white',
                  })}
                >
                  <SilentRefresh
                    refreshToken={cookies().get('refreshToken')?.value}
                  />
                  {/* <MediaContextProvider> */}
                  <Header />
                  {children}
                  {/* </MediaContextProvider> */}
                </main>
              </NextIntlClientProvider>
            </ReactQueryProvider>
          </GoogleOAuthProvider>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
