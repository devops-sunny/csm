import type { Components, Theme } from '@mui/material';

export const MuiChip: Components<Theme>['MuiChip'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: 30,
      height: 21,
      fontSize: 12,
      fontWeight: 400,
      backgroundColor: theme.palette.catskillWhite,
      color: theme.palette.oxfordBlue,
    }),
  },
};
