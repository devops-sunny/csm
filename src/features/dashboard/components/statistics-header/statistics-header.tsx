import { Box, FormControl, useTheme } from '@mui/material';
import { useAtomValue } from 'jotai';

import { ChartSlider } from '@features/dashboard/components/statistics-header/chart-slider/chart-slider';
import { MobileSelectPeriod } from '@features/dashboard/components/statistics-header/modals-drawers/mobile-select-period';
import { SelectPeriod } from '@features/dashboard/components/statistics-header/select-period';
import { TotalCards } from '@features/dashboard/components/statistics-header/total-cards';
import { DASHBOARD_CELL_RATIO } from '@features/dashboard/constants/layout';
import { selectedFacilityIdsAtom } from '@features/dashboard/states/common';
import { FacilitiesSelect } from '@shared/components/common/facilities-select';
import { MobileFacilitiesSelect } from '@shared/components/common/mobile-facilities-select';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const StatisticsHeader = () => {
  const theme = useTheme();

  const selectedFacilityIds = useAtomValue(selectedFacilityIdsAtom);

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        display: 'flex',
        flexFlow: 'column',
        [theme.breakpoints.down('md')]: {
          aspectRatio: DASHBOARD_CELL_RATIO,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2.25,
          alignItems: 'center',
          mb: 1,
          width: 1,
        }}
      >
        <SelectPeriod />
        <MobileSelectPeriod />
        <FormControl
          sx={{
            flex: 1,
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        >
          <FacilitiesSelect
            selectedIds={selectedFacilityIds ?? []}
            onSelect={(facilityIds) => {
              defaultStore.set(selectedFacilityIdsAtom, facilityIds);
            }}
            onLoadedFacilities={(facilityIds) => {
              if (!selectedFacilityIds) {
                defaultStore.set(selectedFacilityIdsAtom, facilityIds);
              }
            }}
          />
        </FormControl>
        <FormControl
          sx={{
            flex: 1,
            display: 'none',
            [theme.breakpoints.down('md')]: {
              display: 'block',
            },
          }}
        >
          <MobileFacilitiesSelect
            selectedIds={selectedFacilityIds ?? []}
            onSelect={(facilityIds) => {
              defaultStore.set(selectedFacilityIdsAtom, facilityIds);
            }}
            onLoadedFacilities={(facilityIds) => {
              if (!selectedFacilityIds) {
                defaultStore.set(selectedFacilityIdsAtom, facilityIds);
              }
            }}
          />
        </FormControl>
      </Box>
      <ChartSlider />
      <TotalCards />
    </Box>
  );
};
