import type { FunctionComponent } from 'react';
import type { TextFieldProps } from '@mui/material';
import { IconButton, InputAdornment, TextField, useTheme } from '@mui/material';

import ChevronDownRoundedIcon from '@assets/icons/common/chevron-down-rounded.svg';

export const AnchorInput: FunctionComponent<TextFieldProps> = ({
  ...textFieldProps
}) => {
  const theme = useTheme();

  const { sx, ...restTextFieldProps } = textFieldProps;

  return (
    <TextField
      cursor="pointer"
      sx={{
        ...sx,
        ...(restTextFieldProps.disabled && {
          pointerEvents: 'none',
        }),
        '&:hover': {
          '.MuiIconButton-root': {
            backgroundColor: theme.palette.blueberry,
            color: theme.palette.white,
          },
        },
      }}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{ pr: 1 }}
          >
            <IconButton
              disabled={restTextFieldProps.disabled}
              size="icon-only"
              sx={{
                color: theme.palette.azure,
                borderRadius: '50%',
                height: 20,
                width: 20,
              }}
            >
              <ChevronDownRoundedIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...restTextFieldProps}
    />
  );
};
