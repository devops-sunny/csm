import cookie from 'js-cookie';

import { AUTH_TOKEN } from '@shared/constants/auth';

export const clearAuthToken = () => {
  cookie.remove(AUTH_TOKEN);
};
