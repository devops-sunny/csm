'use client';

import { type FunctionComponent } from 'react';
import { Stack, IconButton, useTheme, Box } from '@mui/material';
import type { WritableAtom } from 'jotai';
import { useAtomValue } from 'jotai';

import FilterIcon from '@assets/icons/common/filter.svg';
import MoreHorizIcon from '@assets/icons/common/more-horiz.svg';
import PlusIcon from '@assets/icons/common/plus.svg';
import SearchIcon from '@assets/icons/common/search.svg';
import SwapVert from '@assets/icons/common/swap-vert.svg';
import { MobileActionsDrawer } from '@features/managers-log-listing/components/modals-drawers/mobile-actions-drawer';
import { MobileNewReportDrawer } from '@features/managers-log-listing/components/modals-drawers/mobile-new-report-drawer';
import {
  mobileOpenNewReportPanelAtom,
  mobileToolbarOptionPanelAtom,
} from '@features/managers-log-listing/states/common';
import {
  mobileOpenSearchDrawerAtom,
  mobileOpenFiltersDrawerAtom,
  mobileOpenSortDrawerAtom,
  mobileOpenNewLogDrawerAtom,
} from '@features/managers-log-listing/states/modals-drawers';
import { MobileToolbarTrigger } from '@shared/components/common/mobile-toolbar-trigger';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileFooterAction: FunctionComponent = () => {
  const theme = useTheme();

  const searchActive = useAtomValue(mobileOpenSearchDrawerAtom);
  const sortActive = useAtomValue(mobileOpenSortDrawerAtom);
  const filtersActive = useAtomValue(mobileOpenFiltersDrawerAtom);
  const mobileToolbarOptionActive = useAtomValue(mobileToolbarOptionPanelAtom);
  const newLogActive = useAtomValue(mobileOpenNewLogDrawerAtom);

  const closeAllActionDrawers = () => {
    defaultStore.set(mobileOpenNewReportPanelAtom, false);
    defaultStore.set(mobileToolbarOptionPanelAtom, false);
    defaultStore.set(mobileOpenNewLogDrawerAtom, false);
    defaultStore.set(mobileOpenSearchDrawerAtom, false);
    defaultStore.set(mobileOpenSortDrawerAtom, false);
    defaultStore.set(mobileOpenFiltersDrawerAtom, false);
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
        position: 'fixed',
        bottom: 0,
        height: APP_MOBILE_FOOTER_ACTIONS_HEIGHT,
        width: '100%',
        zIndex: theme.zIndex.appBar + 2,
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          px: 3,
          height: '100%',
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
            text="Filter"
            Icon={<FilterIcon />}
            onClick={() => {
              handleTriggerDrawers(mobileOpenFiltersDrawerAtom);
            }}
            active={filtersActive}
          />
          <MobileToolbarTrigger
            text="Search"
            Icon={<SearchIcon />}
            onClick={() => {
              handleTriggerDrawers(mobileOpenSearchDrawerAtom);
            }}
            active={searchActive}
          />
          <MobileToolbarTrigger
            text="Sort"
            Icon={<SwapVert />}
            onClick={() => {
              handleTriggerDrawers(mobileOpenSortDrawerAtom);
            }}
            active={sortActive}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={3}
        >
          <IconButton
            onClick={() => {
              handleTriggerDrawers(mobileToolbarOptionPanelAtom);
            }}
            sx={{
              ...(mobileToolbarOptionActive && {
                backgroundColor: theme.palette.blueberry,
              }),
            }}
          >
            <MoreHorizIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleTriggerDrawers(mobileOpenNewLogDrawerAtom);
            }}
            sx={{
              ...(newLogActive && {
                backgroundColor: theme.palette.blueberry,
              }),
            }}
          >
            <PlusIcon />
          </IconButton>
        </Stack>
      </Stack>
      <MobileNewReportDrawer />
      <MobileActionsDrawer />
    </Box>
  );
};
