import type { FunctionComponent } from 'react';
import { Button, FormControl, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { MobileSortBySelect } from '@features/managers-log-listing/components/common/mobile-sort-by-select';
import { queryParamsAtom } from '@features/managers-log-listing/states/filters';
import { mobileOpenSortDrawerAtom } from '@features/managers-log-listing/states/modals-drawers';
import { MobileDrawer } from '@shared/components/common/mobile-drawer';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { MangerLogSortBy, SortOrder } from '@shared/types/api/generated';

export const MobileSortDrawer: FunctionComponent = () => {
  const theme = useTheme();

  const open = useAtomValue(mobileOpenSortDrawerAtom);

  return (
    <MobileDrawer
      open={open}
      anchor="bottom"
      title="Sort by"
      onOpen={() => defaultStore.set(mobileOpenSortDrawerAtom, true)}
      onClose={() => defaultStore.set(mobileOpenSortDrawerAtom, false)}
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
          <MobileSortBySelect />
        </FormControl>
        <Button
          variant="link"
          sx={{
            ml: 'auto',
            mt: 0.5,
            fontWeight: 400,
            color: theme.palette.azure,
          }}
          onClick={() => {
            defaultStore.set(queryParamsAtom, (prev) => {
              prev.metadata.sortBy = MangerLogSortBy.CreatedAt;
              prev.metadata.sortOrder = SortOrder.Desc;
            });
          }}
        >
          Reset to default
        </Button>
      </Stack>
    </MobileDrawer>
  );
};
