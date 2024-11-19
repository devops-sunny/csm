'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import NextLink from 'next/link';

import LongArrowIcon from '@assets/icons/common/long-arrow.svg';
import { ConfirmedEventsList } from '@features/dashboard/components/confirmed-events/confirmed-events-list';
import { LatestFoodGallery } from '@features/dashboard/components/latest-food-gallery/latest-food-gallery';
import { LogList } from '@features/dashboard/components/manager-log/log-list';
import { MyChecklist } from '@features/dashboard/components/my-checklist/my-checklist';
import { ShiftChangeRequests } from '@features/dashboard/components/shift-change-requests/shift-change-requests';
import { StatisticsHeader } from '@features/dashboard/components/statistics-header/statistics-header';
import { AppRoute } from '@shared/constants/app-route';

export default function PageDashboard() {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.catskillWhite }}>
      <Box
        sx={{
          overflow: 'auto',
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(376px, 1fr))',
          gridTemplateRows: 'repeat(2, 1fr)',
          height: 1,
          columnGap: 3,
          rowGap: 2,
          p: 2.5,
          [theme.breakpoints.down('md')]: {
            maxWidth: 1,
            height: 'auto',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gridTemplateRows: 'repeat(auto-fill, fit-content(350px))',
            p: 1.75,
          },
        }}
      >
        {[
          {
            header: 'Statistics Header',
            Component: StatisticsHeader,
          },
          {
            header: 'Latest Food Gallery',
            Component: LatestFoodGallery,
          },
          {
            header: 'My Checklist',
            Component: MyChecklist,
          },
          {
            header: 'Manager’s Log',
            Component: LogList,
            moreUrl: AppRoute.ManagersLog,
          },
          {
            header: 'Shift Change Requests',
            Component: ShiftChangeRequests,
          },
          {
            header: 'Confirmed Events',
            Component: ConfirmedEventsList,
          },
        ].map(({ header, Component, moreUrl }) => (
          <Box
            key={header}
            sx={{ display: 'flex', flexFlow: 'column' }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1.5,
                flexShrink: 0,
                gap: 2,
              }}
            >
              <Typography
                variant="h2"
                noWrap
              >
                {header}
              </Typography>
              <Button
                variant="text"
                LinkComponent={NextLink}
                href={moreUrl}
                disabled={!moreUrl}
                sx={{
                  color: theme.palette.azure,
                  textTransform: 'none',
                  mr: 1,
                }}
                endIcon={<LongArrowIcon />}
              >
                more
              </Button>
            </Box>
            <Component />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
