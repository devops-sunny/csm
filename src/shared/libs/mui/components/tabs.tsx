import type { Components } from '@mui/material';
import type { Theme } from '@mui/system';

export const MuiTabs: Components<Theme>['MuiTabs'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      minHeight: 0,
      height: 40,
      borderBottom: '1px solid ',
      borderColor: theme.palette.blueHaze,
    }),
    indicator: ({ theme }) => ({
      backgroundColor: theme.palette.blueBerry,
      borderRadius: 3,
      height: 3,
    }),
    flexContainer: () => ({
      gap: 40,
    }),
  },
};
