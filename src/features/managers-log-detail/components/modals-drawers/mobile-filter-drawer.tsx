import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { SettingFields } from '@features/managers-log-detail/components/common/setting-fields';
import { openMobileFilterDrawer } from '@features/managers-log-detail/states/modals-drawers';
import { MobileDrawer } from '@shared/components/common/mobile-drawer';
import { APP_MOBILE_HEADER_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileFilterDrawer = () => {
  const theme = useTheme();

  const open = useAtomValue(openMobileFilterDrawer);

  return (
    <MobileDrawer
      anchor="top"
      open={open}
      noHeader
      showCloseArrow={false}
      onClose={() => defaultStore.set(openMobileFilterDrawer, false)}
      onOpen={() => defaultStore.set(openMobileFilterDrawer, true)}
      anchorGap={APP_MOBILE_HEADER_HEIGHT + 50}
      sx={{
        zIndex: 0,
        display: 'none',
        [theme.breakpoints.down('md')]: {
          display: 'block',
        },
      }}
    >
      <Box
        sx={{
          py: 2,
          display: 'flex',
          flexFlow: 'column',
        }}
      >
        <SettingFields />
        <Button
          sx={{ px: 7, mx: 'auto', mt: 2 }}
          variant="contained"
          onClick={() => defaultStore.set(openMobileFilterDrawer, false)}
        >
          Close
        </Button>
      </Box>
    </MobileDrawer>
  );
};
