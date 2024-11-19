'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Header } from '@features/managers-log-listing/components/listings/header';
import { HeaderFilters } from '@features/managers-log-listing/components/listings/header-filters';
import { MobileFooterAction } from '@features/managers-log-listing/components/listings/mobile-footer-actions';
import { RowGroups } from '@features/managers-log-listing/components/listings/row-groups';
import { DeleteLogModal } from '@features/managers-log-listing/components/modals-drawers/delete-log-modal';
import { MobileDeleteLogDrawer } from '@features/managers-log-listing/components/modals-drawers/mobile-delete-log-drawer';
import { MobileFiltersDrawer } from '@features/managers-log-listing/components/modals-drawers/mobile-filters-drawer';
import { MobileNewLogDrawer } from '@features/managers-log-listing/components/modals-drawers/mobile-new-log-drawer';
import { MobileSearchDrawer } from '@features/managers-log-listing/components/modals-drawers/mobile-search-drawer';
import { MobileSortDrawer } from '@features/managers-log-listing/components/modals-drawers/mobile-sort-drawer';
import { NewLogModal } from '@features/managers-log-listing/components/modals-drawers/new-log-modal';
import { NewReportModal } from '@features/managers-log-listing/components/modals-drawers/new-report-modal';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';

export default function PageManagersLog() {
  const theme = useTheme();

  return (
    <>
      <NewLogModal />
      <NewReportModal />
      <DeleteLogModal />
      <MobileNewLogDrawer />
      <MobileDeleteLogDrawer />
      <MobileSearchDrawer />
      <MobileSortDrawer />
      <MobileFiltersDrawer />
      <Box
        sx={{
          backgroundColor: theme.palette.catskillWhite,
          overflowX: 'auto',
          [theme.breakpoints.down('md')]: {
            pb: `${APP_MOBILE_FOOTER_ACTIONS_HEIGHT}px`,
          },
        }}
      >
        <Box
          sx={{
            height: 1,
            overflow: 'auto',
            boxSizing: 'border-box',
            [theme.breakpoints.down('md')]: {
              maxWidth: 'none',
            },
          }}
        >
          <Box sx={{ position: 'sticky', top: 0, zIndex: 100 }}>
            <HeaderFilters />
            <Header />
          </Box>
          <RowGroups />
        </Box>
        <MobileFooterAction />
      </Box>
    </>
  );
}
