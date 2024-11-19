import type { FunctionComponent } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { WritableAtom } from 'jotai';
import { useAtomValue } from 'jotai';

import InfoIcon from '@assets/icons/common/info.svg';
import SearchIcon from '@assets/icons/common/search.svg';
import { LogSectionsTriggerDrawer } from '@features/managers-log-detail/components/modals-drawers/log-sections-trigger-drawer';
import {
  openMobileFilterDrawer,
  mobileOpenSearchDrawerAtom,
} from '@features/managers-log-detail/states/modals-drawers';
import { MobileToolbarTrigger } from '@shared/components/common/mobile-toolbar-trigger';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileFooterActions: FunctionComponent = () => {
  const theme = useTheme();

  const searchActive = useAtomValue(mobileOpenSearchDrawerAtom);

  const closeAllActionDrawers = () => {
    defaultStore.set(mobileOpenSearchDrawerAtom, false);
    defaultStore.set(openMobileFilterDrawer, false);
  };

  const handleTriggerDrawers = (
    drawerAtom: WritableAtom<
      boolean,
      [boolean | ((draft: boolean) => void)],
      void
    >,
  ) => {
    const currentDrawerState = defaultStore.get(drawerAtom);

    closeAllActionDrawers();

    defaultStore.set(drawerAtom, !currentDrawerState);
  };

  return (
    <Box
      sx={{
        mt: 'auto',
        position: 'fixed',
        bottom: 0,
        width: 1,
        zIndex: theme.zIndex.appBar + 1,
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          px: 3,
          height: APP_MOBILE_FOOTER_ACTIONS_HEIGHT,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.cello,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack
          direction="row"
          spacing={3}
        >
          <MobileToolbarTrigger
            text="Search"
            Icon={<SearchIcon />}
            active={searchActive}
            onClick={() => {
              handleTriggerDrawers(mobileOpenSearchDrawerAtom);
            }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2.5}
        >
          <LogSectionsTriggerDrawer />
          <IconButton
            onClick={() => {
              handleTriggerDrawers(openMobileFilterDrawer);
            }}
          >
            <InfoIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};
