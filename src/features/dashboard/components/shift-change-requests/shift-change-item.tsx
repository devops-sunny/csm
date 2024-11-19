import type { FunctionComponent } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ContextMenu } from '@shared/components/common/context-menu';

export type ShiftChangeItemProps = {
  employeeName: string;
  positionName: string;
  departmentName: string;
  restaurantName: string;
  date: string;
  time: string;
  type: string;
};

export const ShiftChangeItem: FunctionComponent<ShiftChangeItemProps> = ({
  employeeName,
  positionName,
  departmentName,
  restaurantName,
  date,
  time,
  type,
}) => {
  const theme = useTheme();

  return (
    <Box
      className="log-row"
      sx={{
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1fr auto',
        boxSizing: 'border-box',
        minHeight: 'calc(100% / 5)',
        height: 92,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          flexGrow: 1,
          gridTemplateColumns: '1fr auto auto',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            fontSize={11}
            sx={{ [theme.breakpoints.down('md')]: { fontSize: 12 } }}
          >
            {employeeName}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              [theme.breakpoints.down('md')]: { fontSize: 14 },
            }}
            noWrap
          >
            {positionName}
          </Typography>
          <Typography
            noWrap
            fontSize={11}
            sx={{ [theme.breakpoints.down('md')]: { fontSize: 12 } }}
          >
            {departmentName}
          </Typography>
          <Typography
            fontSize={11}
            sx={{ [theme.breakpoints.down('md')]: { fontSize: 12 } }}
            fontWeight={600}
          >
            {restaurantName}
          </Typography>
        </Box>
        <Box sx={{ mr: 2 }}>
          <Typography sx={{ [theme.breakpoints.down('md')]: { fontSize: 14 } }}>
            {date}
          </Typography>
          <Typography sx={{ [theme.breakpoints.down('md')]: { fontSize: 14 } }}>
            {time}
          </Typography>
          <Chip
            label={type}
            sx={{ backgroundColor: '#308667', color: theme.palette.white }}
          />
        </Box>
        <ContextMenu
          menuItems={[
            {
              label: 'Approve',
              onClick: () => {
                console.log('Approve');
              },
            },
            {
              label: 'Decline',
              onClick: () => {
                console.log('Decline');
              },
            },
          ]}
          sx={{ mr: 1 }}
          disablePortal={false}
        />
      </Box>
    </Box>
  );
};
