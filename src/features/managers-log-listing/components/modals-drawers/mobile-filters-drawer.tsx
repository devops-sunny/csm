import type { FunctionComponent } from 'react';
import { Button, FormControl, FormLabel, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { MobileDateRangeFilter } from '@features/managers-log-listing/components/common/mobile-date-range-filter';
import { MobileFacilityFilter } from '@features/managers-log-listing/components/common/mobile-facility-filter';
import { queryParamsAtom } from '@features/managers-log-listing/states/filters';
import { mobileOpenFiltersDrawerAtom } from '@features/managers-log-listing/states/modals-drawers';
import { MobileDrawer } from '@shared/components/common/mobile-drawer';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';
import { useRequestAllFacility } from '@shared/hooks/api/common/use-request-all-facility';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileFiltersDrawer: FunctionComponent = () => {
  const theme = useTheme();

  const open = useAtomValue(mobileOpenFiltersDrawerAtom);

  const { data: requestFacilitiesResponse } = useRequestAllFacility();

  const handleResetFilters = () => {
    defaultStore.set(queryParamsAtom, (prev) => {
      prev.filter.facilityIds =
        requestFacilitiesResponse?.data.map((facility) =>
          Number(facility.id),
        ) ?? [];
      prev.filter.startDateFilter = undefined;
      prev.filter.endDateFilter = undefined;
    });
  };

  return (
    <MobileDrawer
      open={open}
      anchor="bottom"
      title="Filters"
      onOpen={() => defaultStore.set(mobileOpenFiltersDrawerAtom, true)}
      onClose={() => defaultStore.set(mobileOpenFiltersDrawerAtom, false)}
      anchorGap={APP_MOBILE_FOOTER_ACTIONS_HEIGHT}
      sx={{
        display: 'none',
        [theme.breakpoints.down('md')]: {
          display: 'block',
        },
      }}
    >
      <Stack sx={{ p: 3, gap: 1.5 }}>
        <FormControl fullWidth>
          <FormLabel>Select Location</FormLabel>
          <MobileFacilityFilter />
        </FormControl>
        <FormControl>
          <FormLabel>Select Date</FormLabel>
          <MobileDateRangeFilter />
        </FormControl>
        <Button
          variant="link"
          sx={{
            ml: 'auto',
            mt: 0.5,
            fontWeight: 400,
            color: theme.palette.azure,
          }}
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
      </Stack>
    </MobileDrawer>
  );
};
