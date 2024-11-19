import type { Components } from '@mui/material';
import type { Theme } from '@mui/system';

export const MuiDialogActions: Components<Theme>['MuiDialogActions'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      height: 64,
      boxSizing: 'border-box',
      backgroundColor: theme.palette.catskillWhite,
      justifyContent: 'center',
    }),
  },
};
