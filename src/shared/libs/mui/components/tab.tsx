import type { Components } from '@mui/material';
import type { Theme } from '@mui/system';

export const MuiTab: Components<Theme>['MuiTab'] = {
  defaultProps: { disableRipple: true },
  styleOverrides: {
    root: ({ theme }) => ({
      p: 0,
      minHeight: 0,
      fontSize: 13,
      textTransform: 'capitalize',
      color: theme.palette.shark,
      fontWeight: 400,
      '&.Mui-selected': {
        fontWeight: 500,
        color: theme.palette.shark,
      },
    }),
  },
};
