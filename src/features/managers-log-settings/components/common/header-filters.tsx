'use client';

import { type FunctionComponent } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Divider, FormControl, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';
import NextLink from 'next/link';

import { selectedFacilityIdAtom } from '@features/managers-log-settings/states/common';
import { FacilitySelect } from '@shared/components/common/facility-select';
import { AppRoute } from '@shared/constants/app-route';
import { defaultStore } from '@shared/libs/jotai/default-store';

export type HeaderFiltersProps = {
  sx?: SxProps<Theme>;
};

export const HeaderFilters: FunctionComponent<HeaderFiltersProps> = ({
  sx,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        backgroundColor: theme.palette.catskillWhite,
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 2,
        }}
      >
        <Button
          variant="link"
          LinkComponent={NextLink}
          href={AppRoute.ManagersLog}
          sx={{
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'none',
            },
          }}
        >
          <ArrowBack sx={{ mr: 1.25, color: theme.palette.azure }} />
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            Back to the list
          </Typography>
        </Button>
        <Divider
          orientation="vertical"
          sx={{ height: 18, mx: 2.25 }}
        />
        <Typography variant="h2">Manager’s Log Settings</Typography>
      </Box>
      <FormControl sx={{ width: 250 }}>
        <FacilitySelect
          onChange={(value) => defaultStore.set(selectedFacilityIdAtom, value)}
        />
      </FormControl>
    </Box>
  );
};
