import cookie from 'js-cookie';

import { AUTH_TOKEN } from '@shared/constants/auth';

export const setAuthToken = (token: string) => {
  cookie.set(AUTH_TOKEN, token);
};
