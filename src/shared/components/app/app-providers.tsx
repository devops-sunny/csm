'use client';

import type { FunctionComponent, PropsWithChildren } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/system';
import { SWRConfig } from 'swr';

import { AppLoader } from '@shared/components/app/app-loader';
import { AuthLayout } from '@shared/layouts/auth-layout';
import { theme } from '@shared/libs/mui/theme';
import { swrConfig } from '@shared/libs/swr/config';
import { ToasterPlaceholder } from '@shared/libs/toaster/toaster-placeholder';

export const AppProviders: FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <AppRouterCacheProvider>
    <ThemeProvider theme={theme}>
      <SWRConfig value={swrConfig}>
        <ToasterPlaceholder />
        <AuthLayout>
          <AppLoader />
          <main>{children}</main>
        </AuthLayout>
      </SWRConfig>
    </ThemeProvider>
  </AppRouterCacheProvider>
);
