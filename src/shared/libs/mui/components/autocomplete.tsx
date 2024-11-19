import type { Components, Theme } from '@mui/material';

export const MuiAutocomplete: Components<Theme>['MuiAutocomplete'] = {
  defaultProps: { disableClearable: true, disablePortal: true },
  styleOverrides: {
    paper: ({ theme }) => ({
      '& .MuiAutocomplete-option[aria-selected="true"]': {
        backgroundColor: theme.palette.blueberry,
        '& .MuiTypography-root': {
          color: theme.palette.white,
        },
        '&:hover': {
          '& :first-of-type': {
            color: theme.palette.shark,
          },
        },
      },
    }),
    endAdornment: {
      right: '14px !important',
      top: 'calc(50% - 16px);',
    },
    inputRoot: {
      padding: '0 !important',
    },
  },
};
