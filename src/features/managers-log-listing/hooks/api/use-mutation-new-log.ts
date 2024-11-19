import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';

import { managerLogListingApi } from '@features/managers-log-listing/api/manager-log-listing-api';
import { queryParamsAtom } from '@features/managers-log-listing/states/filters';
import { openNewLogModalAtom } from '@features/managers-log-listing/states/modals-drawers';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { AppRoute } from '@shared/constants/app-route';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { replacePathSegments } from '@shared/utils/replace-path-segments';

export const useMutationNewLog = (facilityId?: number) => {
  const { revalidateInfinitePage } = useRevalidate();

  const router = useRouter();

  const queryParams = useAtomValue(queryParamsAtom);

  return useMutation(
    API_CACHE_KEY.ADD_NEW_LOG,
    managerLogListingApi.addNewLog,
    {
      onSuccess: (response) => {
        if (!response.data.entityId || !facilityId) {
          return;
        }

        revalidateInfinitePage(
          [API_CACHE_KEY.GET_MANAGER_LOG_LIST, queryParams],
          {
            hasNewData: true,
          },
        );

        defaultStore.set(openNewLogModalAtom, false);

        const searchParams = new URLSearchParams({
          facilityId: facilityId.toString(),
        });

        const newLogPath = replacePathSegments(AppRoute.ManagersLogDetail, {
          logId: response.data.entityId.toString(),
        });

        router.push(`${newLogPath}?${searchParams.toString()}`);
      },
    },
  );
};
