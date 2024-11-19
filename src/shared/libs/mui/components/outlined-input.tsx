import type { Components, Theme } from '@mui/material';

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
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
      props: {
        multiline: true,
      },
      style: ({ theme }) => ({
        paddingTop: 10.5,
        paddingBottom: 10.5,
        [theme.breakpoints.down('md')]: {
          paddingTop: 13,
          paddingBottom: 13,
        },
      }),
    },
    {
      props: {
        multiline: true,
      },
      style: ({ theme }) => ({
        height: 40,
        [theme.breakpoints.down('md')]: {
          height: 48,
        },
      }),
    },
    {
      props: {
        error: true,
      },
      style: ({ theme }) => ({
        '&.Mui-error': {
          fieldset: {
            '&.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.blueHaze,
            },
          },
        },
        '.MuiInputAdornment-root': {
          color: theme.palette.salmonPearl,
          '&.validation-icon': {
            display: 'flex',
          },
        },
      }),
    },
    {
      props: {
        disabled: true,
      },
      style: ({ theme }) => ({
        '&.Mui-disabled': {
          fieldset: {
            '&.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.blueHaze,
            },
          },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.blueHaze,
          },
          ':hover .MuiSvgIcon-root': {
            backgroundColor: theme.palette.azure,
          },
        },
      }),
    },
  ],
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: 5,
      backgroundColor: theme.palette.white,
      input: {
        paddingLeft: 12,
        paddingRight: 12,
      },
      fieldset: {
        borderColor: theme.palette.blueHaze,
        legend: {
          width: 0,
        },
      },
      '&.MuiOutlinedInput-root:hover': {
        '.MuiSelect-icon': {
          backgroundColor: theme.palette.blueberry,
        },
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.blueberry,
        },
      },
      '&.MuiOutlinedInput-root': {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: '1px',
          borderColor: theme.palette.azure,
        },
      },
      '.MuiInputAdornment-root': {
        zIndex: 1,
        '&.validation-icon': {
          display: 'none',
        },
      },
    }),
  },
};
