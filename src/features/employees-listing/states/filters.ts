import { atomWithImmer } from 'jotai-immer';
import type { FetchArgType } from 'openapi-typescript-fetch';

import type { EmployeeListingApi } from '@features/employees-listing/api/employees-listing-api';
import { EmployeeSortBy, SortOrder } from '@shared/types/api/generated';

export const queryParamsAtom = atomWithImmer<
  Required<FetchArgType<typeof EmployeeListingApi.getEmployee>>
>({
  filter: {
    searchQuery: '',
  },
  metadata: {
    page: 1,
    size: 20,
    sortBy: EmployeeSortBy.Name,
    sortOrder: SortOrder.Desc,
  },
});
