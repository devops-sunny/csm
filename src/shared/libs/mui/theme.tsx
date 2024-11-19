import type { Shadows } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import type {} from '@mui/lab/themeAugmentation';
import * as MuiComponents from '@shared/libs/mui/components';
import { ColorPalette } from '@shared/libs/mui/constants/color-palette';
import { typography } from '@shared/libs/mui/constants/typography';

declare module '@mui/material/styles' {
  interface Palette {
    white: string;
    successGreen: string;
    blueberry: string;
    azure: string;
    eastBay: string;
    cello: string;
    blueHaze: string;
    periwinkle: string;
    shark: string;
    catskillWhite: string;
    salmonPearl: string;
    cadetBlue: string;
    oxfordBlue: string;
    blackCoralPearl: string;
  }
  interface PaletteOptions {
    white: string;
    successGreen: string;
    blueberry: string;
    azure: string;
    eastBay: string;
    cello: string;
    blueHaze: string;
    periwinkle: string;
    shark: string;
    catskillWhite: string;
    salmonPearl: string;
    cadetBlue: string;
    oxfordBlue: string;
    blackCoralPearl: string;
  }
}

export const theme = createTheme({
  palette: {
    white: ColorPalette.White,
    successGreen: ColorPalette.SuccessGreen,
    blueberry: ColorPalette.Blueberry,
    azure: ColorPalette.Azure,
    eastBay: ColorPalette.EastBay,
    cello: ColorPalette.Cello,
    blueHaze: ColorPalette.BlueHaze,
    periwinkle: ColorPalette.Periwinkle,
    shark: ColorPalette.Shark,
    catskillWhite: ColorPalette.CatskillWhite,
    salmonPearl: ColorPalette.SalmonPearl,
    cadetBlue: ColorPalette.CadetBlue,
    oxfordBlue: ColorPalette.OxfordBlue,
    blackCoralPearl: ColorPalette.BlackCoralPearl,
  },
  typography,
  shadows: [
    'none',
    ...Array(24).fill('0px 0px 12px 0px #0000001A;'),
  ] as Shadows,
  components: MuiComponents,
});
