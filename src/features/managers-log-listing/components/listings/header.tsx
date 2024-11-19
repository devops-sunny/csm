'use client';

import type { FunctionComponent } from 'react';
import type { SxProps } from '@mui/material';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';

import { MANAGER_LIST_HEADER_HEIGHT } from '@features/managers-log-listing/constants/layout';

export type HeaderProps = {
  sx?: SxProps<Theme>;
};

export const Header: FunctionComponent<HeaderProps> = ({ sx }) => {
  const theme = useTheme();

  return (
    <Paper
      variant="sharp-edged"
      sx={{
        py: 1,
        display: 'grid',
        gridTemplateColumns:
          'minmax(300px, auto) 200px 200px 200px 200px 200px',
        alignItems: 'center',
        gap: 1.5,
        px: 4,
        minWidth: 'fit-content',
        '> .MuiTypography-root': {
          fontSize: 11,
          fontWeight: 600,
        },
        height: MANAGER_LIST_HEADER_HEIGHT,
        boxSizing: 'border-box',
        zIndex: 1,
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
        ...sx,
      }}
    >
      <Typography>Facility</Typography>
      <Typography>Date</Typography>
      <Typography>Weather</Typography>
      <Typography>Open</Typography>
      <Typography>Mid</Typography>
      <Typography>Close</Typography>
    </Paper>
  );
};
