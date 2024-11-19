import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from 'swr/mutation';

import type { ApiError, SWRKey } from '@shared/libs/swr/types/common';

export type UseMutation = <APIParams, APIResponse>(
  key: SWRKey,
  fetcher: (apiParams: APIParams) => Promise<APIResponse>,
  options?: SWRMutationConfiguration<APIResponse, ApiError>,
) => SWRMutationResponse<APIResponse, ApiError, SWRKey, APIParams>;
