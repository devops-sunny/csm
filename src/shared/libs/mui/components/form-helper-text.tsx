import type { Components, Theme } from '@mui/material';

export const MuiFormHelperText: Components<Theme>['MuiFormHelperText'] = {
  styleOverrides: {
    root: ({ theme, error }) => ({
      color: theme.palette.shark,
      '&.Mui-error': {
        fontWeight: 500,
        color: theme.palette.salmonPearl,
        marginLeft: 0,
      },
      ...(error && {
        marginTop: -4,
        color: theme.palette.salmonPearl,
        fontWeight: 500,
      }),
    }),
  },
};
