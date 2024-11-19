import type { FunctionComponent } from 'react';
import { forwardRef, useState } from 'react';
import type { TextFieldProps } from '@mui/material';
import { TextField, InputAdornment, SvgIcon, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CloseIcon from '@assets/icons/common/cross.svg';
import EyeCloseIcon from '@assets/icons/common/eye-close.svg';
import EyeOpenIcon from '@assets/icons/common/eye-open.svg';

export type PasswordInputProps = Omit<TextFieldProps, 'variant' | 'ref'>;

export const PasswordInput: FunctionComponent<PasswordInputProps> = forwardRef<
  HTMLDivElement,
  TextFieldProps
>(({ error, ...restProps }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();

  return (
    <TextField
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      placeholder="Password"
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{ color: theme.palette.salmonPearl }}
          >
            {error && <CloseIcon />}
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              sx={{
                ...(showPassword && {
                  backgroundColor: theme.palette.blueberry,
                }),
              }}
            >
              {showPassword && (
                <SvgIcon
                  sx={{
                    cursor: 'pointer',
                    color: theme.palette.white,
                  }}
                >
                  <EyeOpenIcon />
                </SvgIcon>
              )}
              {!showPassword && (
                <SvgIcon
                  sx={{
                    cursor: 'pointer',
                    color: theme.palette.white,
                  }}
                >
                  <EyeCloseIcon />
                </SvgIcon>
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={error}
      {...restProps}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
