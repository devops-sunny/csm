import type { ThemeOptions } from '@mui/material';

import { ColorPalette } from '@shared/libs/mui/constants/color-palette';
import { fontClampFormula } from '@shared/libs/mui/constants/font-clamp-formula';

export const typography: ThemeOptions['typography'] = {
  allVariants: {
    color: ColorPalette.Shark,
  },
  fontFamily: 'var(--poppins)',
  body1: {
    fontSize: fontClampFormula.mobile_16_desktop_13,
  },
  body2: {
    fontSize: fontClampFormula.mobile_16_desktop_14,
    fontWeight: 500,
  },
  h1: {
    fontSize: 28,
    fontWeight: 500,
  },
  h2: {
    fontSize: 18,
    fontWeight: 500,
  },
  h3: {
    fontSize: fontClampFormula.mobile_16_desktop_14,
    fontWeight: 600,
  },
  h4: {
    fontSize: fontClampFormula.mobile_16_desktop_13,
    fontWeight: 600,
  },
  button: {
    fontSize: fontClampFormula.mobile_14_desktop_13,
  },
};
