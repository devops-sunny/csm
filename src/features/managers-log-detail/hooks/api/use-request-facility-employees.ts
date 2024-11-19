import { managerLogDetailApi } from '@features/managers-log-detail/api/manager-log-detail-api';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useRequest } from '@shared/hooks/api/core/use-request';

export const useRequestFacilityEmployees = (facilityId: number) =>
  useRequest(
    [API_CACHE_KEY.GET_FACILITY_EMPLOYEES, facilityId],
    () =>
      managerLogDetailApi.getUserList({
        filter: { facilityId },
        metadata: { size: -1, page: 1 },
      }),
    { revalidateOnMount: true },
  );
