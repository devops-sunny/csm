'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Header } from '@features/employees-listing/components/listings/header';
import { HeaderFilters } from '@features/employees-listing/components/listings/header-filters';
import { MobileFooterAction } from '@features/managers-log-listing/components/listings/mobile-footer-actions';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';
import { RowGroups } from '@features/managers-log-listing/components/listings/row-groups';

export default function PageEmployee() {
  const theme = useTheme();

  return (
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
  );
}
