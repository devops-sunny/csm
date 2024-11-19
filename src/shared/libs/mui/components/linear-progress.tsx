import type { Components, Theme } from '@mui/material';

export const MuiLinearProgress: Components<Theme>['MuiLinearProgress'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      height: 5,
      borderRadius: 5,
      backgroundColor: 'transparent',
      '.MuiLinearProgress-bar': {
        borderRadius: 5,
        backgroundColor: theme.palette.azure,
      },
    }),
  },
};
