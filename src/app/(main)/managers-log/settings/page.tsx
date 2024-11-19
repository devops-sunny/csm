'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

import { HeaderActions } from '@features/managers-log-settings/components/common/header-actions';
import { HeaderFilters } from '@features/managers-log-settings/components/common/header-filters';
import { Tabs } from '@features/managers-log-settings/components/common/module-list';
import { AddEditModuleModal } from '@features/managers-log-settings/components/modals-drawers/add-edit-module-modal';
import { DeleteModuleModal } from '@features/managers-log-settings/components/modals-drawers/delete-module-modal';
import { LoadModuleModal } from '@features/managers-log-settings/components/modals-drawers/load-module-modal';
import { MobileAddEditModuleDrawer } from '@features/managers-log-settings/components/modals-drawers/mobile-add-edit-module-drawer';
import { MobileDeleteModuleDrawer } from '@features/managers-log-settings/components/modals-drawers/mobile-delete-module-drawer';
import { MobileLoadModuleDrawer } from '@features/managers-log-settings/components/modals-drawers/mobile-load-module-drawer';
import {
  moduleColumnConfigAtom,
  selectedFacilityIdAtom,
} from '@features/managers-log-settings/states/common';
import { GenericMobileHeader } from '@shared/components/common/generic-mobile-header';
import { AppRoute } from '@shared/constants/app-route';
import { defaultStore } from '@shared/libs/jotai/default-store';

export default function PageManagersLogSettings() {
  const theme = useTheme();

  const router = useRouter();

  useEffect(() => {
    defaultStore.set(selectedFacilityIdAtom, null);
    defaultStore.set(moduleColumnConfigAtom, null);
  }, []);

  return (
    <>
      <AddEditModuleModal />
      <DeleteModuleModal />
      <MobileDeleteModuleDrawer />
      <MobileAddEditModuleDrawer />
      <LoadModuleModal />
      <MobileLoadModuleDrawer />
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          flex: 1,
        }}
      >
        <GenericMobileHeader
          onBack={() => router.push(AppRoute.ManagersLog)}
          title="Manager’s Log Settings"
          sx={{ position: 'fixed', top: 0, zIndex: 1, width: 1 }}
        />
        <Box
          sx={{
            display: 'flex',
            width: 1,
            height: 1,
            backgroundColor: theme.palette.catskillWhite,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexFlow: 'column',
              flex: 1,
              alignItems: 'stretch',
            }}
          >
            <Box sx={{ position: 'sticky', top: 0, zIndex: 100 }}>
              <HeaderFilters />
              <HeaderActions />
            </Box>
            <Tabs />
          </Box>
        </Box>
      </Box>
    </>
  );
}
