import type { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';

import PrintIcon from '@assets/icons/common/print.svg';
import SettingsIcon from '@assets/icons/common/settings.svg';
import {
  mobileOpenNewReportPanelAtom,
  mobileToolbarOptionPanelAtom,
} from '@features/managers-log-listing/states/common';
import { MobileDrawer } from '@shared/components/common/mobile-drawer';
import { AppRoute } from '@shared/constants/app-route';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileActionsDrawer: FunctionComponent = () => {
  const theme = useTheme();

  const router = useRouter();

  const open = useAtomValue(mobileToolbarOptionPanelAtom);

  const handleNavigateLogSettings = () => {
    defaultStore.set(mobileToolbarOptionPanelAtom, false);

    router.push(AppRoute.ManagersLogSettings);
  };

  return (
    <MobileDrawer
      open={open}
      anchor="bottom"
      title="Options"
      onOpen={() => defaultStore.set(mobileToolbarOptionPanelAtom, true)}
      onClose={() => defaultStore.set(mobileToolbarOptionPanelAtom, false)}
      anchorGap={APP_MOBILE_FOOTER_ACTIONS_HEIGHT}
      sx={{
        display: 'none',
        [theme.breakpoints.down('md')]: {
          display: 'block',
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
        }}
      >
        <Button
          onClick={() => defaultStore.set(mobileOpenNewReportPanelAtom, true)}
          startIcon={<PrintIcon />}
        >
          Generate Report
        </Button>
        <Button
          startIcon={<SettingsIcon />}
          onClick={handleNavigateLogSettings}
        >
          Log Settings
        </Button>
      </Box>
    </MobileDrawer>
  );
};
