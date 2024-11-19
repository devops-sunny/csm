'use client';

import type { FunctionComponent } from 'react';
import type { SxProps } from '@mui/material';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';

import { EMPLOYEE_LIST_HEADER_HEIGHT } from '@features/employees-listing/constants/layout';

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
          'auto auto auto auto auto auto',
        alignItems: 'center',
        gap: 1.5,
        px: 4,
        minWidth: 'fit-content',
        '> .MuiTypography-root': {
          fontSize: 11,
          fontWeight: 600,
        },
        height: EMPLOYEE_LIST_HEADER_HEIGHT,
        boxSizing: 'border-box',
        zIndex: 1,
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
        ...sx,
      }}
    >
      <Typography>Name</Typography>
      <Typography>Email</Typography>
      <Typography>Mobile</Typography>
      <Typography>Position</Typography>
      <Typography>Department</Typography>
      <Typography>Facility</Typography>
    </Paper>
  );
};
