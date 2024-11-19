import type { Components } from '@mui/material';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    'sharp-edged': true;
  }
}

export const MuiPaper: Components['MuiPaper'] = {
  styleOverrides: {
    root: {
      boxShadow: '0px 0px 12px 0px #0000001A',
      zIndex: 1,
      borderRadius: '5px',
    },
  },
  variants: [
    {
      props: { variant: 'sharp-edged' },
      style: {
        '&.MuiPaper-root': {
          borderRadius: 0,
        },
      },
    },
  ],
};
