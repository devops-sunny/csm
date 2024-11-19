import type { Components, Theme } from '@mui/material';
import { SvgIcon } from '@mui/material';

import ChevronDownIcon from '@assets/icons/common/chevron-down.svg';

export const MuiAccordionSummary: Components<Theme>['MuiAccordionSummary'] = {
  defaultProps: {
    expandIcon: (
      <SvgIcon sx={{ color: '#375FA4', height: 16, rotate: '-90deg' }}>
        <ChevronDownIcon />
      </SvgIcon>
    ),
  },
  styleOverrides: {
    root: {
      '.MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
      },
    },
  },
};
