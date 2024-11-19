import cookie from 'js-cookie';
import type { Middleware } from 'openapi-typescript-fetch';
import toast from 'react-hot-toast';

import { AUTH_TOKEN } from '@shared/constants/auth';
import { defaultStore } from '@shared/libs/jotai/default-store';
import type { ApiError } from '@shared/libs/swr/types/common';
import { appLoadingAtom } from '@shared/states/common';

const IS_DEV = process.env.NODE_ENV === 'development';

export const interceptor: Middleware = async (url, init, next) => {
  defaultStore.set(appLoadingAtom, true);

  const token = cookie.get(AUTH_TOKEN);

  init.headers.set('Content-Type', 'application/json');
  init.headers.set('Authorization', `Bearer ${token}`);

  try {
    const response = await next(url, init);

    return response;
  } catch (error) {
    const apiError = error as { data: ApiError };

    if (IS_DEV) {
      apiError.data.errors.forEach((errorItem) => {
        toast.error(errorItem.error);
      });
    }

    throw apiError.data as unknown;
  } finally {
    defaultStore.set(appLoadingAtom, false);
  }
};
