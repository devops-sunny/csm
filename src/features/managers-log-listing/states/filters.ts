import { atomWithImmer } from 'jotai-immer';
import type { FetchArgType } from 'openapi-typescript-fetch';

import type { managerLogListingApi } from '@features/managers-log-listing/api/manager-log-listing-api';
import { MangerLogSortBy, SortOrder } from '@shared/types/api/generated';

export const queryParamsAtom = atomWithImmer<
  Required<FetchArgType<typeof managerLogListingApi.getLogs>>
>({
  filter: {
    searchQuery: '',
  },
  metadata: {
    page: 1,
    size: 20,
    sortBy: MangerLogSortBy.CreatedAt,
    sortOrder: SortOrder.Desc,
  },
});
