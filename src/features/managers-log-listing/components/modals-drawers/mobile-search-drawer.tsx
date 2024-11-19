import type { FunctionComponent } from 'react';
import { Box, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { queryParamsAtom } from '@features/managers-log-listing/states/filters';
import { mobileOpenSearchDrawerAtom } from '@features/managers-log-listing/states/modals-drawers';
import { MobileDrawer } from '@shared/components/common/mobile-drawer';
import { SearchInput } from '@shared/components/common/search-input';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileSearchDrawer: FunctionComponent = () => {
  const theme = useTheme();

  const open = useAtomValue(mobileOpenSearchDrawerAtom);
  const queryParams = useAtomValue(queryParamsAtom);

  return (
    <MobileDrawer
      open={open}
      anchor="bottom"
      title="Search"
      onOpen={() => defaultStore.set(mobileOpenSearchDrawerAtom, true)}
      onClose={() => defaultStore.set(mobileOpenSearchDrawerAtom, false)}
      anchorGap={APP_MOBILE_FOOTER_ACTIONS_HEIGHT}
      sx={{
        display: 'none',
        [theme.breakpoints.down('md')]: {
          display: 'block',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <FormControl fullWidth>
          <SearchInput
            value={queryParams.filter.searchQuery}
            onChange={(value) => {
              defaultStore.set(queryParamsAtom, {
                ...queryParams,
                filter: {
                  ...queryParams.filter,
                  searchQuery: value,
                },
              });
            }}
          />
        </FormControl>
      </Box>
    </MobileDrawer>
  );
};
