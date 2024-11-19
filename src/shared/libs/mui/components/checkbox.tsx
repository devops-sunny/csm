import type { Components, Theme } from '@mui/material';
import { Box } from '@mui/material';

import IconCheck from '@assets/icons/common/icon-check.svg';
import IconIndeterminate from '@assets/icons/common/icon-indeterminate.svg';

declare module '@mui/material/Checkbox' {
  interface CheckboxPropsColorOverrides {
    secondary: false;
  }
}

export const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
  defaultProps: {
    disableRipple: true,
    icon: (
      <Box
        sx={{
          height: 16,
          width: 16,
          border: '1px solid',
          borderColor: (theme) => theme.palette.blueHaze,
          backgroundColor: 'transparent',
          color: (theme) => theme.palette.blueberry,
          borderRadius: '2px',
        }}
      />
    ),
    indeterminateIcon: (
      <Box
        sx={{
          height: 18,
          width: 18,
          borderColor: (theme) => theme.palette.blueHaze,
          backgroundColor: 'transparent',
          color: (theme) => theme.palette.azure,
          borderRadius: '2px',
        }}
      >
        <IconIndeterminate />
      </Box>
    ),
    checkedIcon: (
      <Box
        sx={{
          height: 18,
          width: 18,
          borderColor: (theme) => theme.palette.blueHaze,
          color: (theme) => theme.palette.blueberry,
          borderRadius: '2px',
        }}
      >
        <IconCheck />
      </Box>
    ),
  },
  styleOverrides: {
    root: ({ theme }) => ({
      padding: 0,
      paddingRight: 12,
      '.MuiBox-root': {
        backgroundColor: theme.palette.white,
      },
      '&:hover .MuiBox-root': {
        borderColor: theme.palette.blueberry,
      },
      '&.Mui-checked:hover .MuiBox-root': {
        color: theme.palette.blueberry,
      },
      '&.MuiCheckbox-indeterminate:hover .MuiBox-root': {
        color: theme.palette.blueberry,
      },
      '&.Mui-disabled .MuiBox-root': {
        color: theme.palette.blueHaze,
        backgroundColor: theme.palette.blueHaze,
        opacity: 0.5,
      },
    }),
  },
};
