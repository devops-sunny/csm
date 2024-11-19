import cookie from 'js-cookie';

import { AUTH_TOKEN } from '@shared/constants/auth';
import type { APIClientEndpoint } from '@shared/libs/openapi-typescript-fetch/fetch-client';
import type { ApiError } from '@shared/libs/swr/types/common';

const BASE_API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_API;

export async function nativeFetch(
  endpoint: APIClientEndpoint,
  fetchOptions: RequestInit | undefined,
) {
  const token = cookie.get(AUTH_TOKEN);

  const response = await fetch(`${BASE_API_ENDPOINT}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions?.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
    ...fetchOptions,
  });

  if (!response.ok) {
    const { errors }: ApiError = await response.json();

    const errorMessages = errors.map(({ error }) => error).join(', ');

    throw new Error(errorMessages);
  }

  return response;
}
