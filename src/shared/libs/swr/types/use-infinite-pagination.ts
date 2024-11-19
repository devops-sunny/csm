import type {
  SWRInfiniteConfiguration,
  SWRInfiniteResponse,
} from 'swr/infinite';

import type { ApiError, SWRKey } from '@shared/libs/swr/types/common';

type ExtendedOptions = {
  skip?: boolean;
};

type Options<Res, Err> = SWRInfiniteConfiguration<Res, Err> & ExtendedOptions;

export type UseInfinitePagination = <APIResponse>(
  key: SWRKey,
  fetcher: (page: number) => Promise<APIResponse>,
  options?: Options<APIResponse, ApiError>,
) => Omit<
  SWRInfiniteResponse<APIResponse, ApiError>,
  'size' | 'setSize' | 'isLoading'
> & {
  isLoading: boolean;
  isFetchingMore: boolean;
  currentPage: SWRInfiniteResponse<APIResponse, ApiError>['size'];
  loadMore: () => void;
};
