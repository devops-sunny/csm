import type { Components, Theme } from '@mui/material';

export const MuiDivider: Components<Theme>['MuiDivider'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderColor: theme.palette.blueHaze,
    }),
  },
};
