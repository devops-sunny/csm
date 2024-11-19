import type { Components, Theme } from '@mui/material';
import { InputAdornment } from '@mui/material';

import FieldErrorIcon from '@assets/icons/common/field-error.svg';
import { fontClampFormula } from '@shared/libs/mui/constants/font-clamp-formula';

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    square: true;
  }
  interface BaseTextFieldProps {
    cursor?: 'pointer';
  }
}

export const MuiTextField: Components<Theme>['MuiTextField'] = {
  defaultProps: {
    InputLabelProps: { shrink: true },
    InputProps: {
      endAdornment: (
        <InputAdornment
          position="end"
          className="validation-icon"
          sx={{ color: '#EC5160', mr: 1.25 }}
        >
          <FieldErrorIcon />
        </InputAdornment>
      ),
    },
  },
  styleOverrides: {
    root: ({ theme }) => ({
      '.MuiInputBase-adornedEnd': {
        paddingRight: 0,
      },
      '.MuiInputBase-adornedStart': {
        paddingRight: 0,
        paddingLeft: 0,
      },
      '& input[type="text"]': {
        fontSize: fontClampFormula.mobile_16_desktop_13,
        '&.Mui-disabled': {
          opacity: 0.3,
        },
      },
      '& input::placeholder': {
        fontSize: fontClampFormula.mobile_16_desktop_13,
        color: theme.palette.blueHaze,
        opacity: 1,
      },
      '& textarea::placeholder': {
        fontSize: fontClampFormula.mobile_16_desktop_13,
        color: theme.palette.blueHaze,
        opacity: 1,
      },
      '& .Mui-error': {
        '.MuiInputAdornment-positionEnd': {
          '>.MuiSvgIcon-root': {
            marginRight: 10,
          },
        },
      },
    }),
  },
  variants: [
    {
      props: { size: 'square' },
      style: {
        '.MuiInputBase-root': { padding: 4, width: 40, height: 40 },
        input: {
          textAlign: 'center',
          paddingLeft: 0,
        },
      },
    },
    {
      props: { cursor: 'pointer' },
      style: {
        'input,.MuiInputBase-root': {
          cursor: 'pointer',
        },
      },
    },
  ],
};
