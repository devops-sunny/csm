import type { Components } from '@mui/material';
import type { Theme } from '@mui/system';

export const MuiTabPanel: Components<Theme>['MuiTabPanel'] = {
  styleOverrides: {
    root: () => ({
      padding: 0,
    }),
  },
};
