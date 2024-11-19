import { useAtomValue } from 'jotai';

import { managerLogListingApi } from '@features/managers-log-listing/api/manager-log-listing-api';
import {
  deleteLogIdAtom,
  mobileDeleteLogIdAtom,
} from '@features/managers-log-listing/states/common';
import { queryParamsAtom } from '@features/managers-log-listing/states/filters';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const useMutationDeleteLog = () => {
  const queryParams = useAtomValue(queryParamsAtom);

  const { revalidateInfinitePage } = useRevalidate();

  return useMutation(API_CACHE_KEY.DELETE_LOG, managerLogListingApi.deleteLog, {
    onSuccess: () => {
      defaultStore.set(deleteLogIdAtom, null);
      defaultStore.set(mobileDeleteLogIdAtom, null);

      revalidateInfinitePage([API_CACHE_KEY.GET_MANAGER_LOG_LIST, queryParams]);
    },
  });
};
