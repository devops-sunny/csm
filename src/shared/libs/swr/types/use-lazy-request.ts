import type { SWRConfiguration, SWRResponse } from 'swr';

import type { ApiError, SWRKey } from '@shared/libs/swr/types/common';

export type UseLazyRequestOptions<DefaultParams, Response, Error> =
  SWRConfiguration<Response, Error> & {
    defaultParams?: DefaultParams;
  };

export type UseLazyRequest = <APIParams, APIResponse>(
  key: SWRKey,
  fetcher: (apiParams: APIParams) => Promise<APIResponse>,
  options?: UseLazyRequestOptions<APIParams, APIResponse, ApiError>,
) => SWRResponse<
  APIResponse,
  ApiError,
  UseLazyRequestOptions<APIParams, APIResponse, ApiError>
> & { trigger: (apiParams?: APIParams) => void };
