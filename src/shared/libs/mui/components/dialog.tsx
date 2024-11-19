import type { Components } from '@mui/material';

export const MuiDialog: Components['MuiDialog'] = {
  styleOverrides: {
    paper: ({ ownerState }) => ({
      ...(!ownerState.fullScreen && {
        borderRadius: 5,
        boxShadow: '0px 0px 12px 0px #00000033',
        maxWidth: 'none',
        background: 'transparent',
      }),
    }),
  },
};
