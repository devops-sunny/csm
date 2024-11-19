import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { AppProviders } from '@shared/components/app/app-providers';
import { NoInternetAlert } from '@shared/components/app/no-internet-alert';
import { poppinsFont } from '@shared/constants/app-font';
import { appMetadata } from '@shared/constants/metadata';

import './globals.css';

export const metadata: Metadata = appMetadata;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={poppinsFont.className}
    >
      <head>
        <link
          rel="icon"
          href="/favicon.png"
          sizes="any"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta
          name="theme-color"
          content="#203965"
        />
      </head>
      <body>
        <AppProviders>
          {children}
          <NoInternetAlert />
        </AppProviders>
      </body>
    </html>
  );
}
