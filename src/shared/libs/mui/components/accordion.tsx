import type { Components, Theme } from '@mui/material';

export const MuiAccordion: Components<Theme>['MuiAccordion'] = {
  defaultProps: {
    disableGutters: true,
    slotProps: {
      transition: {
        unmountOnExit: true,
      },
    },
  },
  styleOverrides: {
    root: {
      ':before': {
        display: 'none',
      },
    },
  },
};
