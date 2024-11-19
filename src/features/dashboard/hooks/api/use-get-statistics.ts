import { useAtomValue } from 'jotai';

import { dashboardApi } from '@features/dashboard/api/dashboard-api';
import {
  selectedPeriodAtom,
  selectedFacilityIdsAtom,
} from '@features/dashboard/states/common';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useRequest } from '@shared/hooks/api/core/use-request';

export const useGetStatistics = () => {
  const selectedPeriod = useAtomValue(selectedPeriodAtom);
  const selectedFacilityIds = useAtomValue(selectedFacilityIdsAtom);

  return useRequest(
    [
      API_CACHE_KEY.GET_FACILITY_STATISTICS,
      selectedPeriod,
      selectedFacilityIds,
    ],
    () =>
      dashboardApi.getFacilityStatistics({
        facilityIds: selectedFacilityIds ?? [],
        startDate: selectedPeriod.from,
        endDate: selectedPeriod.to,
      }),
    { skip: !selectedFacilityIds },
  );
};
