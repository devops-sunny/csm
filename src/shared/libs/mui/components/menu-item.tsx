import type { Components, Theme } from '@mui/material';

export const MuiMenuItem: Components<Theme>['MuiMenuItem'] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.catskillWhite}`,
      },
      '&:focus-visible': {
        backgroundColor: 'transparent',
        color: theme.palette.blueberry,
        '&.Mui-selected': {
          backgroundColor: theme.palette.blueberry,
        },
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.blueberry,
        color: theme.palette.white,
        '&:hover': {
          color: theme.palette.white,
        },
      },
      '&.MuiMenuItem-root:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.blueberry,
      },
    }),
  },
};
