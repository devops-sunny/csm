import type { FunctionComponent } from 'react';
import { Box, IconButton, SvgIcon, Typography } from '@mui/material';

import ChevronLeftIcon from '@assets/icons/common/chevron-left.svg';
import { theme } from '@shared/libs/mui/theme';

export type EventItemProps = {
  fullName: string;
  restaurantName: string;
  roomName: string;
  date: string;
  time: string;
};

export const EventItem: FunctionComponent<EventItemProps> = ({
  fullName,
  restaurantName,
  roomName,
  date,
  time,
}) => (
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
        gap: 2.5,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            mb: 0.5,
            [theme.breakpoints.down('md')]: { fontSize: 14, mb: 0 },
          }}
          noWrap
        >
          {fullName}
        </Typography>
        <Typography
          noWrap
          sx={{ [theme.breakpoints.down('md')]: { fontSize: 14 } }}
        >
          {restaurantName}
        </Typography>
        <Typography
          sx={{
            mr: 3.5,
            fontSize: 11,
            fontWeight: 600,
            [theme.breakpoints.down('md')]: { fontSize: 12 },
          }}
        >
          {roomName}
        </Typography>
      </Box>
      <Typography
        textAlign="right"
        sx={{ [theme.breakpoints.down('md')]: { fontSize: 14 } }}
      >
        {date}
        <br />
        {time}
      </Typography>
      <IconButton
        size="icon-only"
        sx={{
          rotate: '180deg',
          color: theme.palette.azure,
        }}
      >
        <SvgIcon sx={{ fontSize: 14 }}>
          <ChevronLeftIcon />
        </SvgIcon>
      </IconButton>
    </Box>
  </Box>
);
