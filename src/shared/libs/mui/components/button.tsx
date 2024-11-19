import type { Components, Theme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    link: true;
    outlined: false;
  }
}

export const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: { variant: 'contained', disableRipple: true },
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.button,
      boxShadow: 'none',
      borderRadius: 5,
      fontWeight: 500,
      textTransform: 'capitalize',
      borderWidth: 2,
      lineHeight: 1,
      '&.MuiButton-contained > .MuiLoadingButton-loadingIndicator': {
        color: theme.palette.white,
        fontSize: 20,
      },
      '&:hover': {
        background: theme.palette.blueberry,
        borderWidth: 2,
        borderColor: 'transparent',
        color: theme.palette.white,
      },
    }),
  },
  variants: [
    {
      props: {
        size: 'medium',
      },
      style: ({ theme }) => ({
        height: 40,
        [theme.breakpoints.down('md')]: {
          height: 48,
        },
      }),
    },
    {
      props: { variant: 'contained' },
      style: ({ theme }) => ({
        color: theme.palette.white,
        backgroundColor: theme.palette.azure,
        '&.Mui-disabled': {
          backgroundColor: theme.palette.azure,
          opacity: 0.3,
          color: theme.palette.white,
        },
        [theme.breakpoints.down('md')]: {
          height: 48,
        },
      }),
    },
    {
      props: { variant: 'text' },
      style: ({ theme }) => ({
        width: 'fit-content',
        height: 'fit-content',
        minWidth: 'fit-content',
        padding: 0,
        borderRadius: 0,
        '&:hover': {
          background: 'none',
          color: theme.palette.azure,
        },
        [theme.breakpoints.down('md')]: {
          height: 'fit-content',
        },
      }),
    },
    {
      props: { variant: 'link' },
      style: ({ theme }) => ({
        width: 'fit-content',
        height: 'fit-content',
        minWidth: 'fit-content',
        textDecoration: 'underline',
        textTransform: 'inherit',
        color: theme.palette.shark,
        fontWeight: 500,
        padding: 0,
        '&:hover': {
          background: 'none',
          color: theme.palette.azure,
          textDecoration: 'underline',
        },
        [theme.breakpoints.down('md')]: {
          height: 'fit-content',
        },
      }),
    },
  ],
};
