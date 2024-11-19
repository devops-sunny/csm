import type { Components, Theme } from '@mui/material';

export const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      fontSize: 11,
      color: theme.palette.shark,
      fontWeight: 500,
      '&.MuiInputLabel-root': {
        color: theme.palette.shark,
        top: -18,
        left: 4,
        transform: 'none',
      },
      '&.Mui-disabled': {
        opacity: 0.5,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        fontWeight: 500,
      },
    }),
  },
};
