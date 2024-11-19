import type { FunctionComponent } from 'react';
import type { SxProps } from '@mui/material';
import { Box, Stack, SvgIcon, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import IconCheck from '@assets/icons/common/check-mark.svg';
import { PASSWORD_REQUIREMENTS } from '@features/authentication/constants/password-requirement';

export type PasswordStrengthMeterProps = {
  password: string;
  sx?: SxProps;
};

export const PasswordStrengthMeter: FunctionComponent<
  PasswordStrengthMeterProps
> = ({ password, sx }) => {
  const theme = useTheme();

  const testRequirement = (regex: RegExp) => regex.test(password);

  return (
    <Box sx={sx}>
      {PASSWORD_REQUIREMENTS.map(({ label, regex }) => {
        const isRequirementFulfill = testRequirement(regex);

        return (
          <Stack
            key={label}
            direction="row"
            spacing={1}
          >
            <SvgIcon
              sx={{
                color: isRequirementFulfill
                  ? theme.palette.successGreen
                  : theme.palette.catskillWhite,
              }}
            >
              <IconCheck />
            </SvgIcon>
            <Typography>{label}</Typography>
          </Stack>
        );
      })}
    </Box>
  );
};
