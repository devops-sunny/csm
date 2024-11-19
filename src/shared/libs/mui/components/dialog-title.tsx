import type { Components, Theme } from '@mui/material';

export const MuiDialogTitle: Components<Theme>['MuiDialogTitle'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: '16px',
      backgroundColor: theme.palette.azure,
      color: theme.palette.white,
      fontSize: 14,
      fontWeight: 500,
      textTransform: 'capitalize',
      textAlign: 'left',
    }),
  },
};
