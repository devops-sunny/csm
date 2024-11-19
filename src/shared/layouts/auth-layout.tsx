'use client';

import type { FunctionComponent, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';

import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { AppRoute } from '@shared/constants/app-route';
import { AUTH_TOKEN } from '@shared/constants/auth';
import { PUBLIC_ROUTES } from '@shared/constants/public-routes';
import { useRequest } from '@shared/hooks/api/core/use-request';
import { sharedApi } from '@shared/libs/api/shared-api';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { selfProfileData } from '@shared/states/common';

export const AuthLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const pathname = usePathname();

  const { data, isLoading: getSelfProfileLoading } = useRequest(
    [API_CACHE_KEY.GET_USER_PROFILE],
    () => sharedApi.getSelfProfile({}),
  );

  useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname as AppRoute);

    const hasToken = Boolean(cookie.get(AUTH_TOKEN));

    if (!isPublicRoute && !hasToken) {
      router.push(AppRoute.Login);
    }

    if (!getSelfProfileLoading) {
      if (data?.data) {
        defaultStore.set(selfProfileData, data.data);
      }

      setLoading(false);
    }
  }, [data, getSelfProfileLoading, pathname, router]);

  if (loading) {
    return <LoadingIndicator fullScreen />;
  }

  return children;
};
