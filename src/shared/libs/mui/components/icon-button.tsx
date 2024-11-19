import type { Components, Theme } from '@mui/material';

declare module '@mui/material/IconButton' {
  interface IconButtonPropsSizeOverrides {
    'icon-only': true;
    thin: true;
  }
}

export const MuiIconButton: Components<Theme>['MuiIconButton'] = {
  defaultProps: { disableRipple: true },
  styleOverrides: {
    root: ({ theme }) => ({
      width: 40,
      height: 40,
      background: theme.palette.azure,
      color: theme.palette.white,
      borderRadius: 5,
      padding: 0,
      '&:hover': {
        background: theme.palette.blueberry,
        color: theme.palette.white,
      },
      '&.Mui-disabled': {
        opacity: 0.3,
        color: theme.palette.white,
        background: theme.palette.azure,
      },
      [theme.breakpoints.down('md')]: {
        height: 48,
        width: 48,
      },
    }),
  },
  variants: [
    {
      props: { size: 'thin' },
      style: ({ theme }) => ({
        backgroundColor: 'transparent',
        color: theme.palette.azure,
        padding: 0,
        width: 12,
        height: 28,
        borderRadius: 20,
        '&::before': {
          content: '""',
          position: 'absolute',
          width: 42,
          height: 42,
          backgroundColor: 'transparent',
          borderRadius: '100%',
        },
        '& .MuiSvgIcon-root': {
          color: theme.palette.azure,
        },
        [theme.breakpoints.down('md')]: {
          width: 12,
          height: 28,
        },
      }),
    },
    {
      props: { size: 'icon-only' },
      style: ({ theme }) => ({
        background: 'none',
        width: 24,
        height: 24,
        '&:hover': {
          background: 'none',
          color: theme.palette.cello,
        },
        '&.Mui-disabled': {
          opacity: 0.5,
          background: 'none',
        },
        [theme.breakpoints.down('md')]: {
          width: 24,
          height: 24,
        },
      }),
    },
  ],
};
