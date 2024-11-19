import type { FunctionComponent } from 'react';
import { DateRange as DateRangeIcon } from '@mui/icons-material';
import type { TextFieldProps } from '@mui/material';
import { IconButton, InputAdornment, TextField, useTheme } from '@mui/material';

import ClearTextIcon from '@assets/icons/common/clear-text.svg';

type BaseDatePickerTriggerProps = { onClear: () => void } & TextFieldProps;

export const BaseDatePickerTrigger: FunctionComponent<
  BaseDatePickerTriggerProps
> = ({ onClear, sx, ...textFieldProps }) => {
  const theme = useTheme();

  return (
    <TextField
      {...textFieldProps}
      autoComplete="off"
      sx={[
        {
          caretColor: 'transparent',
          input: { cursor: 'pointer' },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{ mr: 1, color: theme.palette.azure }}
          >
            {textFieldProps.value ? (
              <IconButton
                size="icon-only"
                sx={{ color: theme.palette.salmonPearl }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
              >
                <ClearTextIcon />
              </IconButton>
            ) : (
              <DateRangeIcon />
            )}
          </InputAdornment>
        ),
        sx: { cursor: 'pointer' },
      }}
    />
  );
};
