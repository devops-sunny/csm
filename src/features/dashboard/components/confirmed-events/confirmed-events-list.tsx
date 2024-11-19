import { Box, Paper, useTheme } from '@mui/material';

import { EventItem } from '@features/dashboard/components/confirmed-events/event-item';
import { DASHBOARD_CELL_RATIO } from '@features/dashboard/constants/layout';

const EVENT_MOBILE_ITEM_HEIGHT = 92;

export const ConfirmedEventsList = () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        width: 1,
        height: 1,
        position: 'relative',
        [theme.breakpoints.down('md')]: {
          aspectRatio: DASHBOARD_CELL_RATIO,
          height: EVENT_MOBILE_ITEM_HEIGHT * 4,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'auto',
          '> .log-row:not(:last-child)': {
            borderBottom: '1px solid',
            borderColor: theme.palette.catskillWhite,
          },
          px: 1.5,
        }}
      >
        {[
          {
            fullName: 'Jane Smith',
            restaurantName: 'The Gourmet Kitchen',
            roomName: 'The Garden Room',
            date: '12/13/21',
            time: '10:30',
          },
          {
            fullName: 'Bob Johnson',
            restaurantName: 'The Sizzling Grill',
            roomName: 'The Bar',
            date: '12/14/21',
            time: '10:30',
          },
          {
            fullName: 'Alice Williams',
            restaurantName: 'The Ocean Breeze',
            roomName: 'The Ocean Room',
            date: '12/15/21',
            time: '10:30',
          },
          {
            fullName: 'Charlie Brown',
            restaurantName: 'The Mountain Peak',
            roomName: 'The Peak Room',
            date: '12/16/21',
            time: '10:30',
          },
          {
            fullName: 'Emily Davis',
            restaurantName: 'The Urban Diner',
            roomName: 'The City Room',
            date: '12/17/21',
            time: '10:30',
          },
          {
            fullName: 'Michael Miller',
            restaurantName: 'The Country Pub',
            roomName: 'The Country Room',
            date: '12/18/21',
            time: '10:30',
          },
          {
            fullName: 'Sarah Wilson',
            restaurantName: 'The City Cafe',
            roomName: 'The Cafe Room',
            date: '12/19/21',
            time: '10:30',
          },
          {
            fullName: 'David Moore',
            restaurantName: 'The Riverside Bistro',
            roomName: 'The River Room',
            date: '12/20/21',
            time: '10:30',
          },
          {
            fullName: 'Emma Taylor',
            restaurantName: 'The Downtown Deli',
            roomName: 'The Deli Room',
            date: '12/21/21',
            time: '10:30',
          },
          {
            fullName: 'James Anderson',
            restaurantName: 'The Suburban Saloon',
            roomName: 'The Saloon Room',
            date: '12/22/21',
            time: '10:30',
          },
        ].map((event) => (
          <EventItem
            key={event.fullName}
            {...event}
          />
        ))}
      </Box>
    </Paper>
  );
};
