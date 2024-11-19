import { Box } from '@mui/system';
import { useAtomValue } from 'jotai';

import DollarSign from '@assets/illustrators/dollar-sign.svg';
import TimeKeeper from '@assets/illustrators/time-keeper.svg';
import { dashboardApi } from '@features/dashboard/api/dashboard-api';
import { TotalCard } from '@features/dashboard/components/statistics-header/total-card';
import {
  selectedFacilityIdsAtom,
  selectedPeriodAtom,
} from '@features/dashboard/states/common';
import { getHoursAndMinutesFromDecimal } from '@features/dashboard/utils/get-hours-and-minutes-from-decimal';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useRequest } from '@shared/hooks/api/core/use-request';

export const TotalCards = () => {
  const selectedPeriod = useAtomValue(selectedPeriodAtom);
  const selectedFacilityIds = useAtomValue(selectedFacilityIdsAtom);

  const { data: totalData } = useRequest(
    [
      API_CACHE_KEY.GET_FACILITY_TOTAL_STATS,
      selectedPeriod,
      selectedFacilityIds,
    ],
    () =>
      dashboardApi.getFacilityTotal({
        facilityIds: selectedFacilityIds ?? [],
        startDate: selectedPeriod.from,
        endDate: selectedPeriod.to,
      }),
    { skip: !selectedFacilityIds },
  );

  const totalHoursWorked = Math.round(totalData?.data.totalHoursWorked ?? 0);
  const totalMoneyMade = Math.round(totalData?.data.totalMoneyMade ?? 0);

  const hoursAndMinutesWorked = getHoursAndMinutesFromDecimal(totalHoursWorked);

  return (
    <Box sx={{ display: 'flex', gap: 2.25 }}>
      <TotalCard
        figureColor="#308667"
        label="Total Value"
        value={totalMoneyMade ? `$${totalMoneyMade.toLocaleString()}` : '-'}
        illustrator={<DollarSign />}
      />
      <TotalCard
        figureColor="#ECAE51"
        label="Total Hours"
        value={hoursAndMinutesWorked}
        illustrator={<TimeKeeper />}
      />
    </Box>
  );
};
