import type { FunctionComponent } from 'react';
import { Box, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { searchQueryAtom } from '@features/managers-log-detail/states/common';
import { mobileOpenSearchDrawerAtom } from '@features/managers-log-detail/states/modals-drawers';
import { MobileDrawer } from '@shared/components/common/mobile-drawer';
import { SearchInput } from '@shared/components/common/search-input';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileSearchDrawer: FunctionComponent = () => {
  const theme = useTheme();

  const open = useAtomValue(mobileOpenSearchDrawerAtom);

  const searchQuery = useAtomValue(searchQueryAtom);

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
            value={searchQuery}
            onChange={(value) => {
              defaultStore.set(searchQueryAtom, value);
            }}
          />
        </FormControl>
      </Box>
    </MobileDrawer>
  );
};
