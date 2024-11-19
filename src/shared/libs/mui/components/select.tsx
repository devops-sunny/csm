import type { Components, Theme } from '@mui/material';

import ChevronDownRoundedIcon from '@assets/icons/common/chevron-down-rounded.svg';

export const MuiSelect: Components<Theme>['MuiSelect'] = {
  defaultProps: {
    IconComponent: ChevronDownRoundedIcon,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      '&:hover .MuiSelect-icon [data-id="rounded"]': {
        fill: theme.palette.blueberry,
      },
      '&:hover .MuiSelect-icon': {
        color: theme.palette.white,
      },
    }),
    icon: ({ theme }) => ({
      borderRadius: '50%',
      color: theme.palette.azure,
      fontSize: 16,
      right: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      '&.Mui-disabled': {
        color: theme.palette.white,
        opacity: 0.5,
      },
    }),
    select: ({ ownerState, theme }) => {
      const { defaultValue, value } = ownerState;

      return {
        color:
          defaultValue === value ? theme.palette.blueHaze : theme.palette.shark,
      };
    },
  },
};
