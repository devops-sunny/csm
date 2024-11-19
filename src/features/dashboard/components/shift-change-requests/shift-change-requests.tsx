import { Box, Paper, useTheme } from '@mui/material';

import { ShiftChangeItem } from '@features/dashboard/components/shift-change-requests/shift-change-item';
import { DASHBOARD_CELL_RATIO } from '@features/dashboard/constants/layout';

const SHIFT_CHANGE_REQUEST_MOBILE_ITEM_HEIGHT = 92;

export const ShiftChangeRequests = () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        width: 1,
        height: 1,
        position: 'relative',
        [theme.breakpoints.down('md')]: {
          aspectRatio: DASHBOARD_CELL_RATIO,
          height: SHIFT_CHANGE_REQUEST_MOBILE_ITEM_HEIGHT * 4,
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
            employeeName: 'Jane Smith',
            positionName: 'Chef',
            departmentName: 'Kitchen',
            restaurantName: 'The Gourmet Kitchen',
            date: '12/13/21',
            time: '10:00AM - 2:00PM',
            type: 'Pickup',
          },
          {
            employeeName: 'Bob Johnson',
            positionName: 'Bartender',
            departmentName: 'Bar',
            restaurantName: 'The Sizzling Grill',
            date: '12/14/21',
            time: '2:00PM - 10:00PM',
            type: 'Pickup',
          },
          {
            employeeName: 'Alice Williams',
            positionName: 'Host',
            departmentName: 'Front of House',
            restaurantName: 'The Ocean Breeze',
            date: '12/15/21',
            time: '4:00PM - 8:00PM',
            type: 'Pickup',
          },
          {
            employeeName: 'Charlie Brown',
            positionName: 'Server',
            departmentName: 'Front of House',
            restaurantName: 'The Mountain Peak',
            date: '12/16/21',
            time: '12:00PM - 4:00PM',
            type: 'Pickup',
          },
          {
            employeeName: 'Emily Davis',
            positionName: 'Chef',
            departmentName: 'Kitchen',
            restaurantName: 'The Urban Diner',
            date: '12/17/21',
            time: '10:00AM - 2:00PM',
            type: 'Pickup',
          },
          {
            employeeName: 'Michael Miller',
            positionName: 'Bartender',
            departmentName: 'Bar',
            restaurantName: 'The Country Pub',
            date: '12/18/21',
            time: '2:00PM - 10:00PM',
            type: 'Pickup',
          },
          {
            employeeName: 'Sarah Wilson',
            positionName: 'Host',
            departmentName: 'Front of House',
            restaurantName: 'The City Cafe',
            date: '12/19/21',
            time: '4:00PM - 8:00PM',
            type: 'Pickup',
          },
          {
            employeeName: 'David Moore',
            positionName: 'Server',
            departmentName: 'Front of House',
            restaurantName: 'The Riverside Bistro',
            date: '12/20/21',
            time: '12:00PM - 4:00PM',
            type: 'Pickup',
          },
          {
            employeeName: 'Emma Taylor',
            positionName: 'Chef',
            departmentName: 'Kitchen',
            restaurantName: 'The Downtown Deli',
            date: '12/21/21',
            time: '10:00AM - 2:00PM',
            type: 'Pickup',
          },
          {
            employeeName: 'James Anderson',
            positionName: 'Bartender',
            departmentName: 'Bar',
            restaurantName: 'The Suburban Saloon',
            date: '12/22/21',
            time: '2:00PM - 10:00PM',
            type: 'Pickup',
          },
        ].map((item) => (
          <ShiftChangeItem
            key={item.employeeName}
            {...item}
          />
        ))}
      </Box>
    </Paper>
  );
};
