import type { SWRConfiguration, SWRResponse } from 'swr';

import type { ApiError, SWRKey } from '@shared/libs/swr/types/common';

type ExtendedOptions = {
  skip?: boolean;
};

type Options<Res, Err> = SWRConfiguration<Res, Err> & ExtendedOptions;

export type UseRequest = <APIParams, APIResponse>(
  key: SWRKey,
  fetcher: (apiParams: APIParams) => Promise<APIResponse>,
  options?: Options<APIResponse, ApiError>,
) => SWRResponse<
  APIResponse,
  ApiError,
  SWRConfiguration<APIResponse, ApiError>
>;
