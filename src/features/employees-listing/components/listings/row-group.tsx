'use client';

import { Fragment, type FunctionComponent } from 'react';
import type { SxProps } from '@mui/material';
import { Box, Divider, Paper, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

import { ListingRow } from '@features/managers-log-listing/components/listings/log-listing-row';
import { MobileListingRow } from '@features/managers-log-listing/components/listings/mobile-log-listing-row';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import type { ApiType } from '@shared/types/utils/api';

export type RowGroupProps = {
  sx?: SxProps<Theme>;
  groupLabel: string;
  logs: ApiType['LogResponse'][];
};

export const RowGroup: FunctionComponent<RowGroupProps> = ({
  sx,
  groupLabel,
  logs,
}) => {
  const theme = useTheme();

  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        px: 1,
        py: 1.25,
        ...sx,
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: theme.palette.azure,
          m: 1.25,
        }}
      >
        {groupLabel}
      </Typography>
      <Paper
        sx={{
          px: 1.5,
          display: 'flex',
          flexFlow: 'column',
          minWidth: 'fit-content',
          backgroundColor: theme.palette.white,
          '.MuiDivider-root:last-child': {
            display: 'none',
          },
          [theme.breakpoints.down('md')]: {
            boxShadow: 0,
            px: 0,
            gap: 1.5,
            backgroundColor: 'transparent',
          },
        }}
      >
        {logs.map((log) => (
          <Fragment key={log.id}>
            {isMobile && (
              <MobileListingRow
                sx={sx}
                log={log}
              />
            )}
            {!isMobile && (
              <ListingRow
                sx={sx}
                log={log}
              />
            )}
            <Divider
              sx={{
                [theme.breakpoints.down('md')]: {
                  display: 'none',
                },
              }}
            />
          </Fragment>
        ))}
      </Paper>
    </Box>
  );
};
