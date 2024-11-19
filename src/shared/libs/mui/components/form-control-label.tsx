import type { Components, Theme } from '@mui/material';

export const MuiFormControlLabel: Components<Theme>['MuiFormControlLabel'] = {
  styleOverrides: {
    root: () => ({ margin: 0, fontSize: 13 }),
  },
};
